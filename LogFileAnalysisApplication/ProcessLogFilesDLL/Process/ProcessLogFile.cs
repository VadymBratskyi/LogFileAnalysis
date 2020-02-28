﻿using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using ProcessLogFilesDLL.Common;
using ProcessLogFilesDLL.Process;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {

    #region Class : ProcessLogFile

    public class ProcessLogFile {

        #region Fields : Private

        private readonly DbContextService _dbService;
        private readonly ObjectId _sessionId;
        private readonly string _fileName;
        private readonly GenerateObjects _generateObjects;
        private readonly IHubCallerClients _hubCaller;
        private ProcessLog _processLog;

        #endregion

        #region Properties : Private

        private ProcessLog ProcessLog => _processLog ?? (_processLog = new ProcessLog(_generateObjects));

        #endregion

        #region Constructor : Public

        public ProcessLogFile(DbContextService dbService, string fileName, IHubCallerClients hubCaller) {
            _dbService = dbService;
            _hubCaller = hubCaller;
            _fileName = fileName;
            _generateObjects = new GenerateObjects();
        }

        public ProcessLogFile(DbContextService dbService, ObjectId sessionId, IHubCallerClients hubCaller) {
            _dbService = dbService;
            _hubCaller = hubCaller;
            _sessionId = sessionId;
            _generateObjects = new GenerateObjects();
        }

        #endregion

        #region Methods : Private

        private async Task<GridFSFileInfo<ObjectId>> ProcessFile(ObjectId fileId) {
            using (GridFSDownloadStream<ObjectId> stream = await _dbService.GridFs.OpenDownloadStreamAsync(fileId)) {
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8)) {
                    ProcessLog.ProcessingLog(reader);
                    return stream.FileInfo;
                }
            }
        }

        private async Task<IEnumerable<ProcessSessionFile>> GetSessionFiles(ObjectId sessionId) {
            if (_sessionId == ObjectId.Empty) {
                throw new ArgumentNullException("RunProcessLogFile SessionId is null!!!");
            }
            var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("ProcessSessionId", sessionId);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private async Task<IEnumerable<ProcessSessionFile>> GetSessionSinglFile(string fileName) {
            if (string.IsNullOrEmpty(fileName)) {
                throw new ArgumentNullException("RunProcessLogFile fileName is null!!!");
            }
            var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("FileName", fileName);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private async Task SaveLogObject(List<Log> logs, string fileName) {
            if (logs.Any()) {
                await _dbService.Logs.Create(logs);
                await _hubCaller.All.SendAsync("ProcessNotification", $"Файл: {fileName} оброблено");
            }
        }

        #endregion

        #region Methods : Public

        public async Task RunProcessLogFiles() {
            var sessionFiles = await GetSessionFiles(_sessionId);
            foreach (var item in sessionFiles) {
                var fileInfo = await ProcessFile(item.FileId);
                await SaveLogObject(_generateObjects.LogList, fileInfo.Filename);
            }
            await _hubCaller.All.SendAsync("CompleteProcess", $"Процес обробки файлів завершено");
        }

        public async Task RunProcessSinglLogFile() {
            var sessionFiles = await GetSessionSinglFile(_fileName);
            foreach (var item in sessionFiles) {
                var fileInfo = await ProcessFile(item.FileId);
                await SaveLogObject(_generateObjects.LogList, fileInfo.Filename);
            }
            //await SaveLogObject(_generateObjects.TempLogList, $"Кількість: {_generateObjects.TempLogList.Count} - збережених об'єктів для яких не знайдено Input або Output");
            await _hubCaller.All.SendAsync("CompleteProcess", $"Процес обробки файлу завершено");
        }

        #endregion

    }

    #endregion

}