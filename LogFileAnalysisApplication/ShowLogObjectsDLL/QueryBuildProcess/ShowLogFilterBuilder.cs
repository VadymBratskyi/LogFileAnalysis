using LogFileAnalysisDAL.Models;
using MongoDB.Driver;
using ShowLogObjectsDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShowLogObjectsDLL.QueryBuildProcess {

	#region Class: ShowLogFilterBuilder

	public class ShowLogFilterBuilder {

		Dictionary<string, Func<string, object, FilterDefinition<Log>>> ItemOperators = new Dictionary<string, Func<string, object, FilterDefinition<Log>>>();

		Dictionary<string, Func<string, IEnumerable<object>, FilterDefinition<Log>>> ItemsOperators = new Dictionary<string, Func<string, IEnumerable<object>, FilterDefinition<Log>>>();

		public ShowLogFilterBuilder() {
			ItemOperators.Add("=", GetEqFilter);
			ItemOperators.Add(">", GetGtFilter);
			ItemOperators.Add(">=", GetGteFilter);
			ItemOperators.Add("<", GetLtFilter);
			ItemOperators.Add("<=", GetLteFilter);
			ItemOperators.Add("!=", GetNeFilter);
			ItemsOperators.Add("in", GetInFilter);
			ItemsOperators.Add("not in", GetNinFilter);
		}

		private FilterDefinition<Log> GetNinFilter<T>(string key, IEnumerable<T> values) {
			return Builders<Log>.Filter.Nin(key, new List<T>(values));
		}

		private FilterDefinition<Log> GetInFilter<T>(string key, IEnumerable<T> values) {
			return Builders<Log>.Filter.In(key, new List<T>(values));
		}

		private FilterDefinition<Log> GetNeFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Ne(key, value);
		}

		private FilterDefinition<Log> GetEqFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Eq(key, value);
		}

		private FilterDefinition<Log> GetGtFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Gt(key, value);
		}

		private FilterDefinition<Log> GetGteFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Gte(key, value);
		}

		private FilterDefinition<Log> GetLtFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Lt(key, value);
		}

		private FilterDefinition<Log> GetLteFilter<T>(string key, T value) {
			return Builders<Log>.Filter.Lte(key, value);
		}

		private FilterDefinition<Log> GetAndFilter(IEnumerable<FilterDefinition<Log>> filters) {
			return Builders<Log>.Filter.And(new List<FilterDefinition<Log>>(filters));
		}

		private FilterDefinition<Log> GetOrFilter(IEnumerable<FilterDefinition<Log>> filters) {
			return Builders<Log>.Filter.Or(new List<FilterDefinition<Log>>(filters));
		}

		private FilterDefinition<Log> GetAllArrayFilter<T>(string path, IEnumerable<T> item) { 
			return Builders<Log>.Filter.All(path, new List<T>(item));
		}

		public FilterDefinition<Log> BuildFilter(QueryRules rule)	{
			var filter = ItemOperators.SingleOrDefault(option => option.Key == rule.Operator);
			return filter.Value(rule.Field, rule.Value);
		}

	}

	#endregion

}
