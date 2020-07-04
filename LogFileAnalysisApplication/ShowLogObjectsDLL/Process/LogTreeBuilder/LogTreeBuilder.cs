using Newtonsoft.Json.Linq;
using ShowLogObjectsDLL.Models;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Process.LogTreeBuilder {

	#region Class: LogTreeBuilder

	public static class LogTreeBuilder {

		#region Methods: Private

		private static JTokenType GetTokenValueType(JToken token) {
			return token.Type;
		}

		private static LogTreeNodeData GetLogTreeNodeData(KeyValuePair<string, JToken> token) {
			var nodeData = new LogTreeNodeData(token.Key);
			nodeData.Value = token.Value.ToString();
			return nodeData;
		}

		private static LogTreeNode GetSimpleArrayItem(int index, JToken tokenValue) {
			var keyToken = $"[{index}]";
			var nodeData = new LogTreeNodeData(keyToken);
			nodeData.Value = tokenValue.ToString();
			var treeNode = new LogTreeNode();
			treeNode.Value = nodeData;
			index++;
			return treeNode;
		}

		private static LogTreeNode GetLogTreeNode(KeyValuePair<string, JToken> token) {
			var treeNode = new LogTreeNode();
			treeNode.Value = GetLogTreeNodeData(token);
			switch (GetTokenValueType(token.Value)) {
				case JTokenType.Object:
					var data = (JObject)token.Value;
					foreach (var item in data) {
						treeNode.Children.Add(GetLogTreeNode(item));
					}
					break;
				case JTokenType.Array:
					var datas = (JArray)token.Value;
					foreach (var item in datas) {
						switch (GetTokenValueType(item)) {
							case JTokenType.Object:
								var dt = (JObject)item;
								foreach (var it in dt) {
									treeNode.Children.Add(GetLogTreeNode(it));
								}
								break;
							default:
								var i = 0;
								foreach (var tokenValue in token.Value) {
									treeNode.Children.Add(GetSimpleArrayItem(i, tokenValue));
								}
								break;
						}
					}
					break;
			}
			return treeNode;
		}

		#endregion

		#region Methods: Public

		public static List<LogTreeNode> JsonToLogTreeNode(this JObject jObj) {
			var treeNodeList = new List<LogTreeNode>();
			foreach (var token in jObj) {
				treeNodeList.Add(GetLogTreeNode(token));
			}
			return treeNodeList;
		}

		#endregion

	}

	#endregion

}
