using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using ShowLogObjectsDLL.Models;
using ShowLogObjectsDLL.Process.LogTreeBuilder;
using System;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Process {
	class ProcessLogTree : IProcessLogTree {
		private JObject _getParceObject(BsonDocument document) {
			return JObject.Parse(document.ToJson()
				.Replace("ObjectId(", "")
				.Replace("ISODate(", "")
				.Replace(")", "")
			);
		}

		public List<LogTreeNode> GetTree(BsonDocument log) {
			var jObject = _getParceObject(log);
			var treeNodeList = jObject.JsonToLogTreeNode();
			return treeNodeList;
		}
	}
}
