using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

	#region Class : ProcessLogSession

	public class ProcessLogSession : Entity {

		#region Properties: Public

		public string SessionTitle { get; set; }

		public string UserName { get; set; }

		#endregion

		#region Constructor : Public

		public ProcessLogSession() {
			Id = ObjectId.GenerateNewId();
		}

		#endregion

	}

	#endregion

}