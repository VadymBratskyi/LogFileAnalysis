using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using ShowLogObjectsDLL.Models;
using ShowLogObjectsDLL.Process.LogTreeBuilder;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Process {

	#region Class: ProcessLogTree

	class ProcessLogTree : IProcessLogTree {

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

		public List<LogTreeNode> GetTree(BsonDocument log) {
			var jObject = _getParceObject(log);
			var treeNodeList = jObject.JsonToLogTreeNode();
			return treeNodeList;
		}

		#endregion

	}

	#endregion

}
