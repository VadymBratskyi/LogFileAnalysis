using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using ViewModelsDLL.Models;

namespace ViewModelsDLL.Process.LogTreeBuilder {

	#region Class: LogTreeBuilder

	public static class LogTreeBuilder {

		#region Methods: Private

		private static JTokenType GetTokenValueType(JToken token) {
			return token.Type;
		}

		private static TreeNodeData GetLogTreeNodeData(KeyValuePair<string, JToken> token) {
			var nodeData = new TreeNodeData(token.Key);
			nodeData.Value = token.Value.ToString();
			return nodeData;
		}

		private static TreeNode GetSimpleArrayItem(int index, JToken tokenValue) {
			var keyToken = $"[{index}]";
			var nodeData = new TreeNodeData(keyToken);
			nodeData.Value = tokenValue.ToString();
			var treeNode = new TreeNode();
			treeNode.Value = nodeData;
			index++;
			return treeNode;
		}

		private static TreeNode GetLogTreeNode(KeyValuePair<string, JToken> token) {
			var treeNode = new TreeNode();
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

		public static List<TreeNode> JsonToLogTreeNode(this JObject jObj) {
			var treeNodeList = new List<TreeNode>();
			foreach (var token in jObj) {
				treeNodeList.Add(GetLogTreeNode(token));
			}
			return treeNodeList;
		}

		#endregion

	}

	#endregion

}
