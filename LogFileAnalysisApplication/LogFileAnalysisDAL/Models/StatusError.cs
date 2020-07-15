using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

    #region Class: StatusError

    public class StatusError {

        #region Properties: Public

        public ObjectId Id { get; set; }
        public int Code { get; set; }
        public string Title { get; set; }
        public BsonArray KeyWords { get; set; }
        public ObjectId SubStatusId { get; set; }

		#endregion

	}

	#endregion

}
