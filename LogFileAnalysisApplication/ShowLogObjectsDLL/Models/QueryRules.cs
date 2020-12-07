using LogFileAnalysisDAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Models {
	public class QueryRules {
		public string Field { get; set; }
		public string Operator { get; set; }
		public string Value { get; set; }
		public JObjectType ObjectType { get; set; }
		public LogQueryType Type { get; set; }
	}
}
