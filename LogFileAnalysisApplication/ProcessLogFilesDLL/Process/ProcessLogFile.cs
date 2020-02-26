using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using ProcessLogFilesDLL.Process;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {
	public class ProcessLogFile {

        private readonly DbContextService _dbService;
        private readonly ObjectId _sessionId;
        private TemplateAnalysis _templateAnalysis;
        private List<Log> _logsList;
        private List<Log> _tempLogsList;

        private TemplateAnalysis Template => _templateAnalysis ?? (_templateAnalysis = new TemplateAnalysis());

        public ProcessLogFile(DbContextService dbService, string sesionId) {
            _dbService = dbService;
            _sessionId =  string.IsNullOrEmpty(sesionId) ? ObjectId.Empty : new ObjectId(sesionId);
            _logsList = new List<Log>();
            _tempLogsList = new List<Log>();
        }

        public async void LoadFilesFromGridFs() {

            var sessionFiles = await GetSessionFiles(_sessionId);
            foreach (var item in sessionFiles) {
                await ProcessFile(item.FileId);
            }
        }

        private async Task ProcessFile(ObjectId fileId) {
            //var fileBytes = await _dbService.GetLogFile(fileId);

            DateTime dateStart = DateTime.MinValue;
            DateTime dateEnd = DateTime.MinValue;

            using (Stream fs = new FileStream(@"D:\test_log.log", FileMode.OpenOrCreate)) {
                await _dbService.GridFs.DownloadToStreamAsync(fileId, fs);
            }

            using (StreamReader reader = new StreamReader(@"D:\test_log.log", Encoding.UTF8)) {

                string value;

                while (!string.IsNullOrEmpty(value = reader.ReadLine())) {

                    var startDate = Regex.Match(value, Template.RegStart, RegexOptions.IgnoreCase);
                    if (startDate.Success) {
                        var time = Regex.Match(value, Template.RegDate, RegexOptions.IgnoreCase);
                        if (time.Success) {
                            dateStart = ConverterToDateTime(time.Value);
                        }
                    }

                }

            }


            //MemoryStream theMemStream = new MemoryStream();
            //theMemStream.Write(fileBytes, 0, fileBytes.Length);
            //using (StreamReader stream = new StreamReader(theMemStream, Encoding.UTF8)) {
            //    string value;
            //    while (!string.IsNullOrEmpty(value = stream.ReadLine())) {

            //    }
            //}
        }

        private async Task<IEnumerable<ProcessSessionFile>> GetSessionFiles(ObjectId sessionId) {
            if (_sessionId == ObjectId.Empty) {
                throw new ArgumentNullException("RunProcessLogFile SessionId is null!!!");
            }
            var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("ProcessSessionId", sessionId);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private static DateTime ConverterToDateTime(string date) {
            if (string.IsNullOrWhiteSpace(date)) {
                return default(DateTime);
            }

            DateTime outputDateTime;
            if (!DateTime.TryParse(date, CultureInfo.CreateSpecificCulture("en-US"), DateTimeStyles.None, out outputDateTime)) {
                outputDateTime = DateTime.MinValue;
            }
            return outputDateTime;
        }


    }
}
