using MongoDB.Bson;
using ShowLogObjectsDLL.Models;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Process {

	#region Interface: IProcessLogTree

	interface IProcessLogTree {

		#region Properties: Public

		public List<LogTreeNode> GetTree(BsonDocument log);

		#endregion

	}

	#endregion

}
