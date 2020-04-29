using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {
	public class LogTreeNodeData {
		public string Key { get; set; }
		public string Value { get; set; }

		public LogTreeNodeData(string key) {
			Key = key;
		}
	}
}
