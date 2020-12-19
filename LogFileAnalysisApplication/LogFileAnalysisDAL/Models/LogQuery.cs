using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LogFileAnalysisDAL.Models {

	#region Class: LogQuery

	public class LogQuery : Entity {

		#region Properties : Public

		public string Key { get; set; }
		public LogObjectType LogObjectType { get; set; }
		public LogPropertyType LogPropertyType { get; set; }
		public List<LogQuery> Childrens { get; set; }

		[BsonIgnore]
		[JsonIgnore]
		public bool IsModified { get; set; }

		#endregion

		#region Constructor: Public

		public LogQuery(string keyValue) {
			Id = ObjectId.GenerateNewId();
			Key = keyValue;
			LogObjectType = LogObjectType.none;
			Childrens = new List<LogQuery>();
		}

		#endregion

	}

	#endregion

}
