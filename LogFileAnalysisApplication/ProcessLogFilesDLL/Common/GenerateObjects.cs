using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProcessLogFilesDLL.Common {

	#region Class : GenerateObjects

	public class GenerateObjects {

		#region Fields : Pricate

		private List<Log> _logsList;
		private List<Log> _tempLogsList;
		private TemplateAnalysis _templateAnalysis;

		#endregion

		#region Properties: Private

		private TemplateAnalysis Template => _templateAnalysis ?? (_templateAnalysis = new TemplateAnalysis());

		#endregion

		#region Properties: Public

		public List<Log> LogList => _logsList;

		#endregion

		#region Constructor : Public

		public GenerateObjects() {
			_logsList = new List<Log>();
			_tempLogsList = new List<Log>();
		}

		#endregion

		#region Methods : Private

		private void RemovefromTempList(Log log) {
			if (log.MessageId != "" && log.Request != "" &&
				log.Response != "") {
				_logsList.Add(log);
				_tempLogsList.Remove(log);
			}
		}

		#endregion

		#region Methods : Public

		public void CreateLogObject(string messageId, DateTime requestDate, string request, DateTime responseDate,
			string response) {
			var log = _tempLogsList.FirstOrDefault(o => o.MessageId == messageId);
			if (log == null) {
				var newlog = new Log() {
					MessageId = messageId,
					RequestDate = requestDate,
					Request = string.IsNullOrEmpty(request) ? BsonDocument.Parse(Template.RegIsEmpty) : BsonDocument.Parse(request),
					Response = string.IsNullOrEmpty(response) ? BsonDocument.Parse(Template.RegIsEmpty) : BsonDocument.Parse(response),
					ResponseDate = responseDate
				};
				_tempLogsList.Add(newlog);
			} else if (!string.IsNullOrEmpty(request)) {
				log.RequestDate = requestDate;
				log.Request = string.IsNullOrEmpty(request) ? BsonDocument.Parse(Template.RegIsEmpty) : BsonDocument.Parse(request);
			} else if (!string.IsNullOrEmpty(response)) {
				log.ResponseDate = responseDate;
				log.Response = string.IsNullOrEmpty(response) ? BsonDocument.Parse(Template.RegIsEmpty) : BsonDocument.Parse(response);
			}
			if (log != null) {
				RemovefromTempList(log);
			}
		}

		#endregion

	}

	#endregion

}