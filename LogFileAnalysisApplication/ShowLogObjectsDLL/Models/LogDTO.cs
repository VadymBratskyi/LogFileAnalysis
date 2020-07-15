using System;
using System.Collections.Generic;
using ViewModelsDLL.Models;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogDTO

	public class LogDTO : DataDTO {

		#region Properties: Public

		public DateTime RequestDate { get; set; }
		public IEnumerable<LogTreeNode> Request { get; set; }
		public DateTime ResponseDate { get; set; }
		public IEnumerable<LogTreeNode> Response { get; set; }

		#endregion

	}

	#endregion

}
