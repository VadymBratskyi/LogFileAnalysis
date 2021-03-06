using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LogFileAnalysisDAL.Models {

	#region Class: LogQuery

	public class LogQuery : Entity {

		#region Properties : Public

		public string Key { get; set; }
		public LogObjectType ObjectType { get; set; }
		public LogPropertyType PropertyType { get; set; }
		public List<LogQuery> Childrens { get; set; }

		#endregion

		#region Constructor: Public

		public LogQuery(string keyValue) {
			Id = ObjectId.GenerateNewId();
			Key = keyValue;
			ObjectType = LogObjectType.none;
			Childrens = new List<LogQuery>();
		}

		#endregion

	}

	#endregion

}
