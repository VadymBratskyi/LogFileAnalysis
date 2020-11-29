using System;
using System.Collections.Generic;
using ViewModelsDLL.Models;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogDTO

	public class LogDTO : DataDTO {

		#region Properties: Public

		public DateTime RequestDate { get; set; }
		public IEnumerable<TreeNode> Request { get; set; }
		public DateTime ResponseDate { get; set; }
		public IEnumerable<TreeNode> Response { get; set; }

		#endregion

	}

	#endregion

}
