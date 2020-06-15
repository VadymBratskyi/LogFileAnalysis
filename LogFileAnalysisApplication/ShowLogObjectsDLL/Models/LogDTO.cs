using System;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogDTO

	public class LogDTO : DataDTO{

		public DateTime RequestDate { get; set; }
		public IEnumerable<LogTreeNode> Request { get; set; }
		public DateTime ResponseDate { get; set; }
		public IEnumerable<LogTreeNode> Response { get; set; }

	}

	#endregion

}
