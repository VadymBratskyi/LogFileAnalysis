using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
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
        private GenerateObjects _generateObjects;

        private TemplateAnalysis Template => _templateAnalysis ?? (_templateAnalysis = new TemplateAnalysis());
        
        public ProcessLogFile(DbContextService dbService, string sesionId) {
            _dbService = dbService;
            _sessionId =  string.IsNullOrEmpty(sesionId) ? ObjectId.Empty : new ObjectId(sesionId);
            _generateObjects = new GenerateObjects();
        }

        public async Task LoadFilesFromGridFs() {

            var sessionFiles = await GetSessionFiles(_sessionId);
            foreach (var item in sessionFiles) {
                await ProcessFile(item.FileId);
            }
        }

        private async Task ProcessFile(ObjectId fileId) {

            using (Stream stream = await _dbService.GridFs.OpenDownloadStreamAsync(fileId)) {

                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8)) {

                    DateTime dateStart = DateTime.MinValue;
                    DateTime dateEnd = DateTime.MinValue;

                    string value;
                    int index = 0;

                    while (!string.IsNullOrEmpty(value = reader.ReadLine())) {

                        /*-------------------getDate from log file-----------------*/
                        if (GetMatchTemplate(value, Template.RegStart)) {
                            GetMatchDate(value, out dateStart);
                        }
                        if (GetMatchTemplate(value, Template.RegEnd)) {
                            GetMatchDate(value, out dateEnd);
                        }
                        /*--------------------------------------------------------------*/

                        /*-----------------getRequestAndResponse------------------------*/
                        string input;
                        if (GetMatchTemplate(value, Template.RegInput, out input)) {
                            var data = GetInput(value);
                            var messageId = GetMessageId(data, index, "notFoundInput_");
                            _generateObjects.CreateLogObject(messageId, dateStart, data, DateTime.MinValue, null);
                        }
                        string output;
                        if (GetMatchTemplate(value, Template.RegOutput, out output)) {
                            var data = GetOutput(output);
                            FoundError(data);
                            var messageId = GetMessageId(data, index, "notFoundOutput_");
                            _generateObjects.CreateLogObject(messageId, DateTime.MinValue, null, dateEnd, data);
                        }
                        /*--------------------------------------------------------------*/

                    }

                }
            }

            var dd = _generateObjects.LogList;
        }

        private async Task<IEnumerable<ProcessSessionFile>> GetSessionFiles(ObjectId sessionId) {
            if (_sessionId == ObjectId.Empty) {
                throw new ArgumentNullException("RunProcessLogFile SessionId is null!!!");
            }
            var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("ProcessSessionId", sessionId);
            return await _dbService.ProcessSessionFiles.Get(queryBuilder);
        }

        private bool GetMatchTemplate(string source, string template) {
            var match = Regex.Match(source, template, RegexOptions.IgnoreCase);
            return match.Success;
        }

        private bool GetMatchTemplate(string source, string template, out string matchValue) {
            var match = Regex.Match(source, template, RegexOptions.IgnoreCase);
            matchValue = match.Value;
            return match.Success;
        }

        private bool GetMatchDate(string source, out DateTime date) {
            var time = Regex.Match(source, Template.RegDate, RegexOptions.IgnoreCase);
            date = ConverterToDateTime(time.Value);
            return time.Success;
        }

        private string GetMessageId(string json, int index, string notFoundTemplate) {
            if (string.IsNullOrEmpty(json)) {
                return notFoundTemplate + index;
            }
            dynamic msId = JObject.Parse(json);
            var foudMessageId = msId.message_id.ToString();
            if (string.IsNullOrEmpty(foudMessageId)) {
                return "idIsNull_" + index;
            }
            return foudMessageId;
        }

        private string GetInput(string input) {
            var binarydata = Regex.Match(input, Template.RegBinData, RegexOptions.IgnoreCase);
            var result = binarydata.Success ? input.Replace(binarydata.Value, "\"binary_data\":\"true\"") : input;
            return result.Remove(0, 8);
        }

        private string GetOutput(string output) {
            return output.Remove(0, 8);
        }

        private void FoundError(string json) {            
            var parsError = Regex.Match(json, Template.RegError, RegexOptions.IgnoreCase);
            if (parsError.Success) {
                //DataProcessor.CreateError(json);
            }
        }

        private DateTime ConverterToDateTime(string date) {
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
