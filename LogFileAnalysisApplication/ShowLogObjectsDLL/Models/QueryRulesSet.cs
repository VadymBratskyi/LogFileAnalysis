using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {
	public class QueryRulesSet {
		public string Condition { get; set; }
		public IEnumerable<QueryRules> Rules { get; set; }
	}
}
