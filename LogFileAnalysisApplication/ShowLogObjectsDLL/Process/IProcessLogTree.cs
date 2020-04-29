using MongoDB.Bson;
using ShowLogObjectsDLL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Process {
	interface IProcessLogTree {

		public List<LogTreeNode> GetTree(BsonDocument log);
		public LogTreeNodeData GetTreeNode();

	}
}
