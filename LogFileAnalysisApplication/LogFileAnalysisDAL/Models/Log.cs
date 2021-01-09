using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace LogFileAnalysisDAL.Models {

	#region Class: Log

	public class Log : Entity {

		#region Properties: Public
		[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
		public DateTime RequestDate { get; set; }

		public BsonDocument Request { get; set; }

		public BsonDocument Response { get; set; }

		[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
		public DateTime ResponseDate { get; set; }

		public string MessageId { get; set; }

		#endregion

	}

	#endregion

}