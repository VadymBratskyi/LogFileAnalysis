using Newtonsoft.Json.Linq;
using ShowLogObjectsDLL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Process.LogTreeBuilder {
	public static class LogTreeBuilder {

		public static List<LogTreeNode> logTreee = new List<LogTreeNode>();

		private static JTokenType GetTokenValueTyep(KeyValuePair<string, JToken> token) {
			return token.Value.Type;
		}

		private static LogTreeNodeData GetLogTreeNodeData(KeyValuePair<string, JToken> token) {
			var nodeData = new LogTreeNodeData(token.Key);
			nodeData.Value = token.Value.ToString();
			if (nodeData.Value == "BARS-MESS-6717782") { 
			}
			return nodeData;
		}

		private static LogTreeNode GetLogTreeNode(KeyValuePair<string, JToken> token) {
			var treeNode = new LogTreeNode();
			treeNode.Value = GetLogTreeNodeData(token);
			switch (GetTokenValueTyep(token)) {
				case JTokenType.Object:
					var data = (JObject)token.Value;
					foreach (var item in data) {
						treeNode.Children.Add(GetLogTreeNode(item));
					}
					break;
				case JTokenType.Array:
					var datas = (JArray)token.Value;
					foreach (var item in datas) {
						var dt = (JObject)item;
						foreach (var it in dt) {
							treeNode.Children.Add(GetLogTreeNode(it));
						}
					}
					break;
			}
			return treeNode;
		}



		public static List<LogTreeNode> JsonToLogTreeNode(this JObject jObj) {

			var treeNodeList = new List<LogTreeNode>();

			foreach (var token in jObj) {

				treeNodeList.Add(GetLogTreeNode(token));

			}

			return treeNodeList;
		}

	}

}
