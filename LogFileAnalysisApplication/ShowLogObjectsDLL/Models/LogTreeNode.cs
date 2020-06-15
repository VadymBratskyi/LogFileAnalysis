using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogTreeNode

	public class LogTreeNode {
		public LogTreeNodeData Value { get; set; }
		public IList<LogTreeNode> Children { get; set; }
		public LogTreeNode() {
			Children = new List<LogTreeNode>();
		}
	}

	#endregion

}
