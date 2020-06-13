using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace ProcessLogFilesDLL.Process {

	#region Class: ProcessError

	public class ProcessError {

		public List<Error> ErrorsList { get; private set; }

		private Error CreateError(JToken jtError, string keyErrorMessage) {
			return new Error {
				Message = jtError.Value<string>(keyErrorMessage),
				Details = jtError.Value<string>("data"),
				ResponsError = BsonDocument.Parse(jtError.ToString())
			};
		}

		private void AddNewErrorItem(JToken jtError, string keyMessage) {
			var error = CreateError(jtError, keyMessage);
			ErrorsList.Add(error);
		}

		public ProcessError() {
			ErrorsList = new List<Error>();
		}

		public void CheckErrorObjectInLog(string output) {
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



	}

	#endregion

}
