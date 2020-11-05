using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LogQueryBuilderDLL.Process {
	public class QueryGenerator {

		private JTokenType GetTokenValueType(JToken token) {
			return token.Type;
		}

		private JObjectType GetJObjectType(KeyValuePair<string, JToken> token) {
			switch (GetTokenValueType(token.Value)) {
				case JTokenType.Object:
					return JObjectType.jobject;
				case JTokenType.Array:
					return JObjectType.jarray;
				default:
					return JObjectType.none;
			}
		}

		private void AnalysisLogQuery(LogQuery logQuery, KeyValuePair<string, JToken> token, Action<List<LogQuery>, KeyValuePair<string, JToken>> action) {
			switch (logQuery.ObjectType) {
				case JObjectType.jobject:
					var objectData = (JObject)token.Value;
					foreach (var objectItem in objectData) {
						action(logQuery.Childrens, objectItem);
					}
					break;
				case JObjectType.jarray:
					var datas = (JArray)token.Value;
					foreach (var item in datas) {
						switch (GetTokenValueType(item)) {
							case JTokenType.Object:
								var arrayData = (JObject)item;
								foreach (var arrayItem in arrayData) {
									action(logQuery.Childrens, arrayItem);
								}
								break;
						}
					}
					break;
			}
		}

		private void ActionAddLogQuery(List<LogQuery> logQueries, KeyValuePair<string, JToken> item) {
			if (GetIsExistQueryByName(logQueries, item.Key)) {
				logQueries.Add(CreateLogQuery(item));
			}
		}

		private LogQuery CreateLogQuery(KeyValuePair<string, JToken> token) {
			var logQuery = new LogQuery(token.Key);
			logQuery.ObjectType = GetJObjectType(token);
			AnalysisLogQuery(logQuery, token, ActionAddLogQuery);
			return logQuery;
		}

		private void ChangeExistLogQuery(List<LogQuery> logQueries, KeyValuePair<string, JToken> token) {
			var jObjectType = GetJObjectType(token);
			var existItem = logQueries.SingleOrDefault(model => model.Key.ToLower() == token.Key.ToLower() && model.ObjectType == jObjectType);
			if (existItem == null) {
				var newQuery = CreateLogQuery(token);
				logQueries.Add(newQuery);
			}
			else {
				AnalysisLogQuery(existItem, token, ChangeExistLogQuery);
			}
		}

		public bool GetIsExistQueryByName(List<LogQuery> array, string name) {
			return array.SingleOrDefault(query => query.Key.ToLower() == name.ToLower()) != null;
		}

		public void ProcessExistLogQuery(LogQuery logQuery, BsonDocument bsonElements) {
			var existJobject = JObject.Parse(bsonElements.ToJson());
			foreach (var existItem in existJobject) {
				ChangeExistLogQuery(logQuery.Childrens, existItem);
			}
		}

		public LogQuery CreateLogQueryFromBsonDocument(string propertyName, BsonDocument bsonElements) {
			var jOject = JObject.Parse(bsonElements.ToJson());
			var query = new LogQuery(propertyName);
			switch (GetTokenValueType(jOject)) {
				case JTokenType.Object:
					query.ObjectType = JObjectType.jobject;
					foreach (var model in jOject) {
						query.Childrens.Add(CreateLogQuery(model));
					}
					break;
				case JTokenType.Array:
					query.ObjectType = JObjectType.jarray;
					foreach (var mdel in jOject) {
						query.Childrens.Add(CreateLogQuery(mdel));
					}
					break;
			}
			return query;
		}

	}
}
