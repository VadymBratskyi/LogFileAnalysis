using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogTreeNode

	public class LogTreeNode {

		#region Properties: Public

		public LogTreeNodeData Value { get; set; }
		public IList<LogTreeNode> Children { get; set; }

		#endregion

		#region Constructor: Public

		public LogTreeNode() {
			Children = new List<LogTreeNode>();
		}

		#endregion

	}

	#endregion

}
