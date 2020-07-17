using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

	#region Class: Answer

	public class Answer {

		#region Properties: Public

		public ObjectId Id { get; set; }
		public string Text { get; set; }
		public ObjectId StatusId { get; set; }

		#endregion

	}

	#endregion

}
