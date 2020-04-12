using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {
	public class LogTree {
		public LogTreeNode Value { get; set; }
		public IEnumerable<LogTreeNode> Childrens { get; set; }
	}
}
