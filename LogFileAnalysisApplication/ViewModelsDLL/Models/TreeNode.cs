using System.Collections.Generic;

namespace ViewModelsDLL.Models {

	#region Class: TreeNode

	public class TreeNode {

		#region Properties: Public

		public TreeNodeData Value { get; set; }
		public IList<TreeNode> Children { get; set; }

		#endregion

		#region Constructor: Public

		public TreeNode() {
			Children = new List<TreeNode>();
		}

		#endregion

	}

	#endregion

}
