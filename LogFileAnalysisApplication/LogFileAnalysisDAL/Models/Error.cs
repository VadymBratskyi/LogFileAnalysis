using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

	#region Class: Error

	public class Error : Entity {

		#region Properties: Public

		public string Message { get; set; }

		public string MessageId { get; set; }

		public string Details { get; set; }

		public BsonDocument ResponsError { get; set; }

		public int CountFounded { get; set; }

		#endregion

	}

	#endregion

}
