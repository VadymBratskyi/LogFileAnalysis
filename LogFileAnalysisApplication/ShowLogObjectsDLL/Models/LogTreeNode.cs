using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Models {
	public class LogTreeNode {
		public LogTreeNodeData Value { get; set; }
		public IList<LogTreeNode> Children { get; set; }
		public LogTreeNode() {
			Children = new List<LogTreeNode>();
		}
	}
}
