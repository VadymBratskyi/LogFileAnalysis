using LogFileAnalysisDAL.Models;

namespace ShowLogObjectsDLL.Models {

	#region Class: QueryRules

	public class QueryRules {

		#region Properties: Public

		public string Field { get; set; }
		public string Operator { get; set; }
		public string Value { get; set; }
		public LogObjectType ObjectType { get; set; }
		public LogPropertyType Type { get; set; }

		#endregion

	}

	#endregion

}
