using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

	#region: StatusTreeNode

	public class StatusTreeNode {

		#region Properties: Public

		public StatusErrorDTO Value { get; set; }
		public List<StatusTreeNode> Children { get; set; }

		#endregion

		#region Constructor: Public

		public StatusTreeNode() {
			Children = new List<StatusTreeNode>();
		}

		#endregion

	}

	#endregion

}
