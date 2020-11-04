using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using LogQueryBuilderDLL.Process;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace LogQueryBuilderDLL {
	public class ProcessQueryBuilding {

		private readonly DbContextService _dbService;
		private List<LogQuery> _logQueries;
		private QueryGenerator _queryGenerator;

		private QueryGenerator QueryGenerator => _queryGenerator ?? (_queryGenerator = new QueryGenerator());

		public ProcessQueryBuilding(DbContextService dbService) {
			_logQueries = new List<LogQuery>();
			_dbService = dbService;
		}

		private bool GetIsExistQueryByName(List<LogQuery> array, string name) {
			return array.SingleOrDefault(query => query.Key.ToLower() == name.ToLower()) != null;
		}

		private bool GetIsBsonDocumentType(Type properType) {
			return properType == typeof(BsonDocument);
		}

		private static JTokenType GetTokenValueType(JToken token) {
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

		public void AnalysisLogQuery(LogQuery logQuery, KeyValuePair<string, JToken> token, Action<List<LogQuery>, KeyValuePair<string, JToken>> action ) {
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

		public void ProcessExitLogQuery(List<LogQuery> logQueries, KeyValuePair<string, JToken> token) {
			var jObjectType = GetJObjectType(token);
			var existItem = logQueries.SingleOrDefault(model => model.Key.ToLower() == token.Key.ToLower() && model.ObjectType == jObjectType);
			if (existItem == null) {
				var newQuery = CreateLogQuery(token);
				logQueries.Add(newQuery);
			}
			else {
				AnalysisLogQuery(existItem, token, ProcessExitLogQuery);
			}
		}

		public async Task AnalysisLogObjectToQuery(List<Log> logList) {
			foreach (var log in logList) {
				var type = log.GetType();
				var properties = new List<PropertyInfo>(type.GetProperties());
				foreach (var property in properties) {
					if (!GetIsExistQueryByName(_logQueries, property.Name) && 
						!GetIsBsonDocumentType(property.PropertyType)) {
						var query = new LogQuery(property.Name);
						_logQueries.Add(query);
					}
					else if(GetIsBsonDocumentType(property.PropertyType)) {
						if (GetIsExistQueryByName(_logQueries, property.Name)) {
							var existData = _logQueries.SingleOrDefault(item => item.Key == property.Name);
							var existValue = property.GetValue(log) as BsonDocument;
							var existJobject = JObject.Parse(existValue.ToJson());
							foreach (var existItem in existJobject) {
								ProcessExitLogQuery(existData.Childrens, existItem);
							}
							break;
						}
						var value = property.GetValue(log) as BsonDocument;
						var jOject = JObject.Parse(value.ToJson());
						var query = new LogQuery(property.Name);
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
						_logQueries.Add(query);
					}
				}
			}
			await _dbService.LogQueries.Create(_logQueries);
		}

		public void GetQueryBuilderConfig() {
			

		}

	}
}



//  config: QueryBuilderConfig = {
//   fields: {
//     messageId: {name: 'MessageId', type: 'string'},     
//     requestDate: {name: 'RequestDate', type: 'date', operators: ['=', '<=', '>'],
//       defaultValue: (() => new Date())
//     },
//     responseDate: {name: 'ResponseDate', type: 'date', operators: ['=', '<=', '>'],
//       defaultValue: (() => new Date())
//     }      
//   }
// }


// config: QueryBuilderConfig = {
//   fields: {
//     age: {name: 'Age', type: 'number'},
//     gender: {
//       name: 'Gender',
//       type: 'category',
//       options: [
//         {name: 'Male', value: 'm'},
//         {name: 'Female', value: 'f'}
//       ]
//     },
//     name: {name: 'Name', type: 'string'},
//     notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
//     educated: {name: 'College Degree?', type: 'boolean'},
//     birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
//       defaultValue: (() => new Date())
//     },
//     school: {name: 'School', type: 'string', nullable: true},
//     occupation: {
//       name: 'Occupation',
//       type: 'multiselect',
//       options: [
//         {name: 'Student', value: 'student'},
//         {name: 'Teacher', value: 'teacher'},
//         {name: 'Unemployed', value: 'unemployed'},
//         {name: 'Scientist', value: 'scientist'}
//       ]
//     }
//   }
// }
