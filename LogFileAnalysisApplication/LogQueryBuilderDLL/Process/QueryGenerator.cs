using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LogQueryBuilderDLL.Process {
	public class QueryGenerator {

		private JTokenType GetTokenValueType(JToken token) {
			return token.Type;
		}

		private LogObjectType GetJObjectType(KeyValuePair<string, JToken> token) {
			switch (GetTokenValueType(token.Value)) {
				case JTokenType.Object:
					return LogObjectType.jobject;
				case JTokenType.Array:
					return LogObjectType.jarray;
				default:
					return LogObjectType.none;
			}
		}

		private void AnalysisLogQuery(LogQuery logQuery, KeyValuePair<string, JToken> token, Action<List<LogQuery>, KeyValuePair<string, JToken>> action) {
			switch (logQuery.LogObjectType) {
				case LogObjectType.jobject:
					var objectData = (JObject)token.Value;
					foreach (var objectItem in objectData) {
						action(logQuery.Childrens, objectItem);
					}
					break;
				case LogObjectType.jarray:
					var datas = (JArray)token.Value;
					foreach (var item in datas) {
						switch (GetTokenValueType(item)) {
							case JTokenType.Object:
								var arrayData = (JObject)item;
								foreach (var arrayItem in arrayData) {
									action(logQuery.Childrens, arrayItem);
								}
								break;
							default:
								logQuery.LogPropertyType = GetJsType(item.Type);
								break;
						}
					}
					break;
			}
		}


		private LogPropertyType GetJsType(JTokenType tokenType) {
			switch (tokenType) {
				case JTokenType.String:
					return LogPropertyType.text;
				case JTokenType.Date:
					return LogPropertyType.date;
				case JTokenType.Integer:
					return LogPropertyType.number;
				case JTokenType.Boolean:
					return LogPropertyType.boolean;
				default:
					return LogPropertyType.none;

			}
		}

		private void ActionAddLogQuery(List<LogQuery> logQueries, KeyValuePair<string, JToken> item) {
			if (!GetIsExistQueryByName(logQueries, item.Key)) {
				logQueries.Add(CreateLogQuery(item));
			}
		}

		private LogQuery CreateLogQuery(KeyValuePair<string, JToken> token) {
			var logQuery = new LogQuery(token.Key);
			logQuery.LogPropertyType = GetJsType(token.Value.Type);
			logQuery.LogObjectType = GetJObjectType(token);
			AnalysisLogQuery(logQuery, token, ActionAddLogQuery);
			return logQuery;
		}

		private void ChangeExistLogQuery(List<LogQuery> logQueries, KeyValuePair<string, JToken> token) {
			var jObjectType = GetJObjectType(token);
			var existItem = logQueries.SingleOrDefault(model => model.Key.ToLower() == token.Key.ToLower() && model.LogObjectType == jObjectType);
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
					query.LogObjectType = LogObjectType.jobject;
					foreach (var model in jOject) {
						query.Childrens.Add(CreateLogQuery(model));
					}
					break;
				case JTokenType.Array:
					query.LogObjectType = LogObjectType.jarray;
					foreach (var mdel in jOject) {
						query.Childrens.Add(CreateLogQuery(mdel));
					}
					break;
			}
			return query;
		}

	}
}
