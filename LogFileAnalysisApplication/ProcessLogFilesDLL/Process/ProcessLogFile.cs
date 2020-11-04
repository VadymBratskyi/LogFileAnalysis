using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using LogQueryBuilderDLL;
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
        private readonly ProcessLogNotifier _processLogNotifier;
        private ObjectsGenerator _objectsGenerator;
        private ProcessLog _processLog; 
        private ProcessOffer _processOffer;
        private ProcessQueryBuilding _proceQueryBuilding;
        private ProcessAnalysisError _processAnalysisError;

        #endregion

        #region Properties : Private

        private ObjectsGenerator ObjectsGenerator => _objectsGenerator ?? (_objectsGenerator = new ObjectsGenerator());
        private ProcessLog ProcessLog => _processLog ?? (_processLog = new ProcessLog(ObjectsGenerator));
        private ProcessOffer ProcessOffer => _processOffer ?? (_processOffer = new ProcessOffer());
        private ProcessQueryBuilding ProcessQueryBuilding => _proceQueryBuilding ?? (_proceQueryBuilding = new ProcessQueryBuilding(_dbService));

        private ProcessAnalysisError ProcessAnalysisError => _processAnalysisError ?? (_processAnalysisError = new ProcessAnalysisError(_dbService, ProcessOffer));

        #endregion

        #region Constructor : Public

        public ProcessLogFile(DbContextService dbService, ProcessLogNotifier logNotifier) {
            _dbService = dbService;
            _processLogNotifier = logNotifier;
        }

        public ProcessLogFile(DbContextService dbService, ProcessLogNotifier logNotifier, string fileName) : 
                this(dbService, logNotifier) {
            _fileName = fileName;
        }

        public ProcessLogFile(DbContextService dbService, ProcessLogNotifier logNotifier, ObjectId sessionId): 
                this(dbService, logNotifier) {
            _sessionId = sessionId;
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
                throw new ArgumentNullException("GetSessionFiles SessionId is null!!!");
            }
            var filter1 = Builders<ProcessSessionFile>.Filter.Eq("ProcessSessionId", sessionId);
            var filter2 = Builders<ProcessSessionFile>.Filter.Eq("StatusFile", StatusSessionFile.newFile);
            var queryBuilder = Builders<ProcessSessionFile>.Filter.And(filter1, filter2);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private async Task<IEnumerable<ProcessSessionFile>> GetSessionSinglFile(string fileName) {
            if (string.IsNullOrEmpty(fileName)) {
                throw new ArgumentNullException("GetSessionSinglFile fileName is null!!!");
            }
            var filter1 = Builders<ProcessSessionFile>.Filter.Eq("FileName", fileName);
            var filter2 = Builders<ProcessSessionFile>.Filter.Eq("StatusFile", StatusSessionFile.newFile);
            var queryBuilder = Builders<ProcessSessionFile>.Filter.And(filter1, filter2);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private async Task SaveLogObject(List<Log> logs, string fileName) {
            if (logs.Any()) {
                await _dbService.Logs.Create(logs);
                await _processLogNotifier.Notify(fileName, logs.Count);
            }
        }

        private async Task SaveErrorLogObject(IEnumerable<Error> errors) {
            if (errors.Any()) {
                await _dbService.Errors.Create(errors);
                await ProcessAnalysisError.AnalysisErrorMessage(errors);
            }
        }

        private async Task UpdateSessionFiles(ProcessSessionFile sessionFile) {
            if (sessionFile == null) {
                throw new ArgumentNullException("UpdateSessionFiles() sessionFile is null!");
            }
            sessionFile.StatusFile = StatusSessionFile.processedFile;
            await _dbService.ProcessSessionFiles.Update(sessionFile, sessionFile.Id);
        }

        private async Task GenerateQueries(List<Log> logs) {
           await ProcessQueryBuilding.AnalysisLogObjectToQuery(logs);
        }

        private async Task ProcessSessionFile(IEnumerable<ProcessSessionFile> sessionFiles) {
            foreach (var item in sessionFiles) {
                var fileInfo = await ProcessFile(item.FileId);
                await SaveLogObject(ObjectsGenerator.GetLogList(), fileInfo.Filename);
                await SaveErrorLogObject(ProcessLog.GetErrorList());
                await UpdateSessionFiles(item);
                await _processLogNotifier.NotifyOffers(ProcessOffer.GetOffers());
                await GenerateQueries(ObjectsGenerator.GetLogList());
            }
        }

        #endregion

        #region Methods : Public

        public async Task RunProcessLogFiles() {
            var sessionFiles = await GetSessionFiles(_sessionId);
            await ProcessSessionFile(sessionFiles);
        }

        public async Task RunProcessSinglLogFile() {
            var sessionFiles = await GetSessionSinglFile(_fileName);
            await ProcessSessionFile(sessionFiles);
        }

        #endregion

    }

    #endregion

}