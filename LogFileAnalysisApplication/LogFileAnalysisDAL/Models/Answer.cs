using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

	#region Class: Answer

	public class Answer : Entity {

		#region Properties: Public

		public string Text { get; set; }
		public ObjectId StatusId { get; set; }

		#endregion

	}

	#endregion

}
