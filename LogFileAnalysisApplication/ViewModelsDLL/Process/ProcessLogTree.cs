using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using ViewModelsDLL.Models;
using ViewModelsDLL.Process.LogTreeBuilder;

namespace ViewModelsDLL.Process {

	#region Class: ProcessLogTree

	public class ProcessLogTree : IProcessLogTree {

		#region Methods: Private

		private JObject _getParceObject(BsonDocument document) {
			return JObject.Parse(document.ToJson()
				.Replace("ObjectId(", "")
				.Replace("ISODate(", "")
				.Replace(")", "")
			);
		}

		#endregion

		#region Methods: Public

		public List<TreeNode> GetTree(BsonDocument log) {
			var jObject = _getParceObject(log);
			var treeNodeList = jObject.JsonToLogTreeNode();
			return treeNodeList;
		}

		#endregion

	}

	#endregion

}
