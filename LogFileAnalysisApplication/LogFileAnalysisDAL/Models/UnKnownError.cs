﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LogFileAnalysisDAL.Models {

	#region Class: UnKnownError

	public class UnKnownError : Entity {

		#region Properties: Public

		public int CountFounded { get; set; }

		public string MessageId { get; set; }

		public string Message { get; set; }

		public BsonDocument Error { get; set; }

		[BsonIgnore]
		public bool IsModified { get; set; }

		#endregion

	}

	#endregion

}
