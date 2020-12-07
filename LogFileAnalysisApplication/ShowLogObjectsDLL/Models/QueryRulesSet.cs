using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Models {
	public class QueryRulesSet {
		public string Condition { get; set; }
		public IEnumerable<QueryRules> Rules { get; set; }
	}
}
