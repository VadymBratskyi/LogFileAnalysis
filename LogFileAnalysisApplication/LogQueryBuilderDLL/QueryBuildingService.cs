using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using LogQueryBuilderDLL.Models;
using LogQueryBuilderDLL.Process;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace LogQueryBuilderDLL {
	public class QueryBuildingService {

		private readonly DbContextService _dbService;
		private List<LogQuery> _logQueries;
		private QueryGenerator _queryGenerator;

		private QueryGenerator QueryGenerator => _queryGenerator ?? (_queryGenerator = new QueryGenerator());

		public QueryBuildingService(DbContextService dbService) {
			_logQueries = new List<LogQuery>();
			_dbService = dbService;
		}

		private bool GetIsBsonDocumentType(Type properType) {
			return properType == typeof(BsonDocument);
		}

		private List<PropertyInfo> GetLogProperties(Log log) {
			var type = log.GetType();
			return new List<PropertyInfo>(type.GetProperties());
		}

		private void GetLogQueryFromDb(string propertyName) {
			var findItem = _logQueries.SingleOrDefault(item => item.Key == propertyName);
			if (findItem == null) {
				var filter = Builders<LogQuery>.Filter.Eq<string>(info => info.Key, propertyName);
				var findQuery = _dbService.LogQueries.GetSingle(filter);
				if (findQuery != null) {
					findQuery.IsModified = true;
					_logQueries.Add(findQuery);
				}
			}
		}

		private async Task CreateOrUpdateQueryItem() {
			foreach (var item in _logQueries) {
				if (item.IsModified) {
					await _dbService.LogQueries.Update(item, item.Id);
				}
				else {
					await _dbService.LogQueries.Create(item);
				}
			}
		}

		public LogQueryType GetCsharptType(Type propertyType) {
			 switch (propertyType.Name) {
				case nameof(DateTime):
					return LogQueryType.date;
				default:
					return LogQueryType.text;
			}
		}

		private void GetLogQueriesByLogProperties(Log log) {
			var properties = GetLogProperties(log);
			foreach (var property in properties) {
				GetLogQueryFromDb(property.Name);
				if (!QueryGenerator.GetIsExistQueryByName(_logQueries, property.Name) &&
					!GetIsBsonDocumentType(property.PropertyType)) {
					var query = new LogQuery(property.Name);
					query.LogQueryType = GetCsharptType(property.PropertyType);
					_logQueries.Add(query);
				}
				else if (GetIsBsonDocumentType(property.PropertyType)) {
					if (QueryGenerator.GetIsExistQueryByName(_logQueries, property.Name)) {
						var documents = property.GetValue(log) as BsonDocument;
						var existData = _logQueries.SingleOrDefault(item => item.Key == property.Name);
						QueryGenerator.ProcessExistLogQuery(existData, documents);
					}
					else {
						var documents = property.GetValue(log) as BsonDocument;
						var query = QueryGenerator.CreateLogQueryFromBsonDocument(property.Name, documents);
						_logQueries.Add(query);
					}
				}
			}
		}

		public async Task AnalysisLogObjectToQuery(List<Log> logList) {
			foreach (var log in logList) {
				GetLogQueriesByLogProperties(log);
			}
			await CreateOrUpdateQueryItem();
		}

		public async Task<QueryBuilderConfig> GetQueryBuilderConfig() {
			var config = new QueryBuilderConfig();
			var queries = await _dbService.LogQueries.GetAsync();
			config.Fields = queries.ToList();
			return config;
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
