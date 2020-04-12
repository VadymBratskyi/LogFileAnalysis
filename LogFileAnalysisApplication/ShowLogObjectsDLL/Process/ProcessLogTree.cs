using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using ShowLogObjectsDLL.Models;
using ShowLogObjectsDLL.Process.TreeBuilder;
using System;

namespace ShowLogObjectsDLL.Process {
	class ProcessLogTree : IProcessLogTree {

		private readonly BuilderLogTree _logTreeBuilder;

		public ProcessLogTree() {
			_logTreeBuilder = new BuilderLogTree();
		}

		private JObject _getParceObject(BsonDocument document) {
			return JObject.Parse(document.ToJson()
				.Replace("ObjectId(", "")
				.Replace("ISODate(", "")
				.Replace(")", "")
			);
		}

		public LogTree GetTree(BsonDocument log) {
			var logTree = new LogTree();
			var jObject = _getParceObject(log);
		

			return logTree;
		}

		public LogTreeNode GetTreeNode() {
			throw new NotImplementedException();
		}
	}
}
