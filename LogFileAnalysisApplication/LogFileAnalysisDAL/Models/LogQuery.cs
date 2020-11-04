using System.Collections.Generic;

namespace LogFileAnalysisDAL.Models {
	public class LogQuery {

		public JObjectType ObjectType { get; set; }
		public string Key { get; set; }
		public LogQueryType LogQueryType { get; set; }
		public List<LogQuery> Childrens { get; set; }

		public LogQuery(string keyValue) {
			Key = keyValue;
			ObjectType = JObjectType.none;
			Childrens = new List<LogQuery>();
		}

	}
}
