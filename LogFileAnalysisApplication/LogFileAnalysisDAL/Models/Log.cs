using MongoDB.Bson;
using System;

namespace LogFileAnalysisDAL.Models {

    #region Class: Log

    public class Log {

        #region Properties: Public

        public ObjectId Id { get; set; }

        public DateTime RequestDate { get; set; }

        public BsonDocument Request { get; set; }

        public BsonDocument Response { get; set; }

        public DateTime ResponseDate { get; set; }

        public ObjectId LogFileId { get; set; }

        public string MessageId { get; set; }

        #endregion

	}

	#endregion

}