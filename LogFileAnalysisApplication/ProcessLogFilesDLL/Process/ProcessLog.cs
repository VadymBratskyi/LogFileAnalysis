using LogFileAnalysisDAL.Models;
using Newtonsoft.Json.Linq;
using ProcessLogFilesDLL.Common;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text.RegularExpressions;

namespace ProcessLogFilesDLL.Process {

	#region Class : ProcessLog

	public class ProcessLog {

		#region Fields : Private

		private TemplateAnalysis _templateAnalysis;
		private ProcessError _processError;
		private readonly ObjectsGenerator _generateObjects;

		#endregion

		#region Constructor : Public

		public ProcessLog(ObjectsGenerator generateObjects) {
			_generateObjects = generateObjects;
		}

		#endregion

		#region Properties : Public

		private TemplateAnalysis Template => _templateAnalysis ?? (_templateAnalysis = new TemplateAnalysis());

		 ProcessError ProcessError => _processError ?? (_processError = new ProcessError());

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

		private string GetMessageId(string json, string notFoundTemplate) {
			if (string.IsNullOrEmpty(json)) {
				return notFoundTemplate + Guid.NewGuid();
			}
			var msId = JObject.Parse(json);
			var foudMessageId = msId.Value<string>("message_id");
			if (string.IsNullOrEmpty(foudMessageId)) {
				return "idIsNull_" + Guid.NewGuid();
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

		private void FoundError(string json, string messageId) {
			var parsError = Regex.Match(json, Template.RegError, RegexOptions.IgnoreCase);
			if (parsError.Success) {
				ProcessError.ProcessErrorObjectInLog(json, messageId);
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
			_generateObjects.ClearLogList();
			DateTime dateStart = DateTime.MinValue;
			DateTime dateEnd = DateTime.MinValue;
			string value;
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
					var messageId = GetMessageId(data, "notFoundInput_");
					_generateObjects.CreateLogObject(messageId, dateStart, data, DateTime.MinValue, null);
				}
				string output;
				if (GetMatchTemplate(value, Template.RegOutput, out output)) {
					var data = GetOutput(output);
					var messageId = GetMessageId(data, "notFoundOutput_");
					_generateObjects.CreateLogObject(messageId, DateTime.MinValue, null, dateEnd, data);
					FoundError(data, messageId);
				}
			}
		}

		public IEnumerable<Error> GetErrorList() {
			return ProcessError.ErrorsList;
		}

		#endregion

	}

	#endregion

}