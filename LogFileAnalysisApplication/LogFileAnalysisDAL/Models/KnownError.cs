using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {

    #region Class: KnownError

    public class KnownError : Entity {

        public int CountFounded { get; set; }

        public string Message { get; set; }

        public BsonDocument Error { get; set; }

        public BsonDocument Status { get; set; }

        public BsonDocument Answer { get; set; }

    }

	#endregion

}
