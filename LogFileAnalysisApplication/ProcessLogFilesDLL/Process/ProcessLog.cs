using Newtonsoft.Json.Linq;
using ProcessLogFilesDLL.Common;
using System;
using System.Globalization;
using System.IO;
using System.Text.RegularExpressions;

namespace ProcessLogFilesDLL.Process {

    #region Class : ProcessLog

    public class ProcessLog {

        #region Fields : Private

        private TemplateAnalysis _templateAnalysis;
        private readonly GenerateObjects _generateObjects;

        #endregion

        #region Constructor : Public

        public ProcessLog(GenerateObjects generateObjects) {
            _generateObjects = generateObjects;
        }

		#endregion

        #region Properties : Public

		private TemplateAnalysis Template => _templateAnalysis ?? (_templateAnalysis = new TemplateAnalysis());

        #endregion

        #region Methods: Private

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

        #endregion

        #region Methods: Public

        public void ProcessingLog(StreamReader reader) {            
            _generateObjects.LogList.Clear();
            DateTime dateStart = DateTime.MinValue;
            DateTime dateEnd = DateTime.MinValue;
            string value;
            int index = 0;
            while (!string.IsNullOrEmpty(value = reader.ReadLine())) {
                if (GetMatchTemplate(value, Template.RegStart)) {
                    GetMatchDate(value, out dateStart);
                }
                if (GetMatchTemplate(value, Template.RegEnd)) {
                    GetMatchDate(value, out dateEnd);
                }
                string input;
                if (GetMatchTemplate(value, Template.RegInput, out input)) {
                    var data = GetInput(input);
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
                index++;
            }
        }

		#endregion

	}

	#endregion

}