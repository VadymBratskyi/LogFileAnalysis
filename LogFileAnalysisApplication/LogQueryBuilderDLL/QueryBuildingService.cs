﻿using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using LogQueryBuilderDLL.Models;
using LogQueryBuilderDLL.Process;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace LogQueryBuilderDLL {

	#region Class: QueryBuildingService

	public class QueryBuildingService {

		#region Fieds: Private

		private readonly DbContextService _dbService;
		private List<LogQuery> _logQueries;
		private QueryGenerator _queryGenerator;

		#endregion

		#region Properties: Private

		private QueryGenerator QueryGenerator => _queryGenerator ?? (_queryGenerator = new QueryGenerator());

		#endregion

		#region Constructor: Public

		public QueryBuildingService(DbContextService dbService) {
			_logQueries = new List<LogQuery>();
			_dbService = dbService;
		}

		#endregion

		#region Methods: Private

		private bool GetIsBsonDocumentType(Type properType) {
			return properType == typeof(BsonDocument);
		}

		private List<PropertyInfo> GetLogProperties(Log log) {
			var type = log.GetType();
			return new List<PropertyInfo>(type.GetProperties());
		}

		private async Task CreateOrUpdateQueryItem() {
			foreach (var item in _logQueries) {
				var filter = Builders<LogQuery>.Filter.Eq<string>(model => model.Key, item.Key);
				var findQuery = _dbService.LogQueries.GetSingle(filter);
				if (findQuery != null) {
					await _dbService.LogQueries.Update(item);
				}
				else {
					await _dbService.LogQueries.Create(item);
				}
			}
		}

		private void GetLogQueriesByLogProperties(Log log) {
			var properties = GetLogProperties(log);
			foreach (var property in properties) {
				if (!QueryGenerator.GetIsExistQueryByName(_logQueries, property.Name) &&
					!GetIsBsonDocumentType(property.PropertyType)) {
					var query = new LogQuery(property.Name);
					query.PropertyType = GetCsharptType(property.PropertyType);
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

		private IEnumerable<QueryConfig> CreateDefaultQueryConfigs() {
			return new List<QueryConfig>() {
				new QueryConfig() {
					Key = "RequestDate",
					Name = "RequestDate",
					ObjectType = LogObjectType.none,
					PropertyType = LogPropertyType.date
				},
				new QueryConfig() {
					Key = "ResponseDate",
					Name = "ResponseDate",
					ObjectType = LogObjectType.none,
					PropertyType = LogPropertyType.date
				},
				new QueryConfig() {
					Key = "MessageId",
					Name = "MessageId",
					ObjectType = LogObjectType.none,
					PropertyType = LogPropertyType.text
				}
			};
		}

		#endregion

		#region Methods: Public

		public LogPropertyType GetCsharptType(Type propertyType) {
			 switch (propertyType.Name) {
				case nameof(DateTime):
					return LogPropertyType.date;
				default:
					return LogPropertyType.text;
			}
		}

		public async Task AnalysisLogObjectToQuery(List<Log> logList) {
			foreach (var log in logList) {
				GetLogQueriesByLogProperties(log);
			}
			await CreateOrUpdateQueryItem();
		}

		public async Task<QueryBuilderConfig> GetAccesFieldsForQueryBuilder() {
			var config = new QueryBuilderConfig();
			var queries = await _dbService.LogQueries.GetAsync();
			config.Fields = queries.Where(model => model.Key != "Id").ToList();
			return config;
		}

		public async Task<IEnumerable<QueryConfig>> GetConfig() {
			var config = await _dbService.QueryConfigs.GetAsync();
			if (!config.Any()) {
				config = CreateDefaultQueryConfigs();
				await _dbService.QueryConfigs.Create(config);
			}
			return config;
		}

		public async Task AddNewItem(IEnumerable<QueryConfig> queries) {
			foreach (var query in queries) {
				var filterKey = Builders<QueryConfig>.Filter.Eq("Key", query.Key);
				var filterName = Builders<QueryConfig>.Filter.Eq("Name", query.Name);
				var filters = Builders<QueryConfig>.Filter.And(new List<FilterDefinition<QueryConfig>> { filterKey, filterName });
				var existQuery = await _dbService.QueryConfigs.GetAsync(filters);
				if(!existQuery.Any()) {
					await _dbService.QueryConfigs.Create(query);
				}
			}
		}

		#endregion

	}

	#endregion

}