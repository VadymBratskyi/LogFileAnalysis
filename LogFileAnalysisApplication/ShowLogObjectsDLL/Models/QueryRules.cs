using LogFileAnalysisDAL.Models;

namespace ShowLogObjectsDLL.Models {
	public class QueryRules {
		public string Field { get; set; }
		public string Operator { get; set; }
		public string Value { get; set; }
		public LogObjectType ObjectType { get; set; }
		public LogPropertyType Type { get; set; }
	}
}
