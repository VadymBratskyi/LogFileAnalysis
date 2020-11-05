using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace LogFileAnalysisDAL.Models {
	public class LogQuery : Entity {

		public JObjectType ObjectType { get; set; }
		public string Key { get; set; }
		public LogQueryType LogQueryType { get; set; }
		public List<LogQuery> Childrens { get; set; }
		[BsonIgnore]
		public bool IsModified { get; set; }

		public LogQuery(string keyValue) {
			Id = ObjectId.GenerateNewId();
			Key = keyValue;
			ObjectType = JObjectType.none;
			Childrens = new List<LogQuery>();
		}

	}
}
