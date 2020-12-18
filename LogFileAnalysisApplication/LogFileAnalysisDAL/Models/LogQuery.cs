using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LogFileAnalysisDAL.Models {
	public class LogQuery : Entity {

		public string Key { get; set; }
		public LogObjectType LogObjectType { get; set; }
		public LogPropertyType LogPropertyType { get; set; }
		public List<LogQuery> Childrens { get; set; }

		[BsonIgnore]
		[JsonIgnore]
		public bool IsModified { get; set; }

		public LogQuery(string keyValue) {
			Id = ObjectId.GenerateNewId();
			Key = keyValue;
			LogObjectType = LogObjectType.none;
			Childrens = new List<LogQuery>();
		}

	}
}
