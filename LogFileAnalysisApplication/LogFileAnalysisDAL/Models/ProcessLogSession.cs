using MongoDB.Bson;
using System;

namespace LogFileAnalysisDAL.Models {

	#region Class : ProcessLogSession

	public class ProcessLogSession : Entity {

		#region Properties: Public

		public DateTime CreatedOn { get; set; }

		public string SessionTitle { get; set; }
		
		public string UserName { get; set; }

		#endregion

		#region Constructor : Public

		public ProcessLogSession() {
			Id = ObjectId.GenerateNewId();
			CreatedOn = DateTime.Now;
		}

		#endregion

	}

	#endregion

}