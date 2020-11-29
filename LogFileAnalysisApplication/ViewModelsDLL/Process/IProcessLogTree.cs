using MongoDB.Bson;
using System.Collections.Generic;
using ViewModelsDLL.Models;

namespace ViewModelsDLL.Process {

	#region Interface: IProcessLogTree

	interface IProcessLogTree {

		#region Properties: Public

		public List<TreeNode> GetTree(BsonDocument log);

		#endregion

	}

	#endregion

}
