using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;

namespace ProcessLogFilesDLL.Process {

	#region Class: ProcessError

	public class ProcessError {

		#region Methods: Private

		private Error CreateError(JToken jtError, string keyErrorMessage) {
			return new Error {
				MessageId = MessageId,
				Message = jtError.Value<string>(keyErrorMessage),
				Details = jtError.Value<string>("data"),
				ResponsError = BsonDocument.Parse(jtError.ToString()),
				CountFounded = 1
			};
		}

		private void AddNewErrorItem(JToken jtError, string keyMessage) {
			var error = CreateError(jtError, keyMessage);
			var exisError = ErrorsList.FirstOrDefault(model => model.Message == error.Message);
			if (exisError == null) {
				ErrorsList.Add(error);
			}
			else {
				exisError.CountFounded++;
			}
		}

		#endregion

		#region Properties: Public

		public List<Error> ErrorsList { get; private set; }

		#endregion

		#region Properties: Private

		public string MessageId { get; set; }

		#endregion

		#region Constructor: Public

		public ProcessError() {
			ErrorsList = new List<Error>();
		}

		#endregion

		#region Methods: Public

		public void ProcessErrorObjectInLog(string output, string messageId) {
			MessageId = messageId;
			var jsOutput = JObject.Parse(output);
			var status = jsOutput.Value<string>("status");
			if (status != null && status == "OK") {
				var results = jsOutput.GetValue("RESULT");
				foreach (var jsResult in results) {
					AddNewErrorItem(jsResult, "error");
				}
			} else {
				var jsError = jsOutput.GetValue("error");
				if (jsError != null) {
					AddNewErrorItem(jsError, "message");
				}
			}
		}

		#endregion

	}

	#endregion

}
