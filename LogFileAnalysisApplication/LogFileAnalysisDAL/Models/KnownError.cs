using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

    #region Class: KnownError

    public class KnownError : Entity {

        #region Properties: Public

        public int CountFounded { get; set; }

        public string Message { get; set; }

        public BsonDocument Error { get; set; }

        public BsonDocument Status { get; set; }

        public BsonDocument Answer { get; set; }

		#endregion

	}

	#endregion

}
