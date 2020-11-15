using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {
	public class QueryConfig : Entity {

		public string Key { get; set; }
		public string Name { get; set; }
		public LogQueryType Type { get; set; }

	}
}
