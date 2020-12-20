using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using ShowLogObjectsDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShowLogObjectsDLL.QueryBuildProcess {

	#region Class: ShowLogFilterBuilder

	public class ShowLogFilterBuilder {

		Dictionary<string, Func<string, dynamic, FilterDefinition<Log>>> ItemOperators = new Dictionary<string, Func<string, dynamic, FilterDefinition<Log>>>();

		Dictionary<string, Func<string, dynamic, FilterDefinition<Log>>> ItemsOperators = new Dictionary<string, Func<string, dynamic, FilterDefinition<Log>>>();

		public ShowLogFilterBuilder() {
			InitItemOperators();
			InitItemsOperators();
		}

		private void InitItemOperators() {
			ItemOperators.Add("=", GetEqFilter);
			ItemOperators.Add(">", GetGtFilter);
			ItemOperators.Add(">=", GetGteFilter);
			ItemOperators.Add("<", GetLtFilter);
			ItemOperators.Add("<=", GetLteFilter);
			ItemOperators.Add("!=", GetNeFilter);
			ItemOperators.Add("like", GetLikeFilter);
		}

		private void InitItemsOperators() {
			ItemsOperators.Add("=", GetAnyEqItemsFilter);
			ItemsOperators.Add(">", GetAnyGtItemsFilter);
			ItemsOperators.Add(">=", GetAnyGteItemsFilter);
			ItemsOperators.Add("<", GetAnyLtItemsFilter);
			ItemsOperators.Add("<=", GetAnyLteItemsFilter);
			ItemsOperators.Add("!=", GetAnyNeItemsFilter);
		}

		private FilterDefinition<Log> GetNinFilter<T>(string key, IEnumerable<T> values) {
			return Builders<Log>.Filter.Nin(key, new List<T>(values));
		}

		private FilterDefinition<Log> GetInFilter<T>(string key, IEnumerable<T> values) {
			return Builders<Log>.Filter.In(key, new List<T>(values));
		}

		private FilterDefinition<Log> GetNeFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Ne(key, value);
		}

		private FilterDefinition<Log> GetEqFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Eq(key, value);
		}

		private FilterDefinition<Log> GetLikeFilter(string path, dynamic value) {
			return Builders<Log>.Filter.Regex(path, new BsonRegularExpression(value.ToString()));
		}

		private FilterDefinition<Log> GetGtFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Gt(key, value);
		}

		private FilterDefinition<Log> GetGteFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Gte(key, value);
		}

		private FilterDefinition<Log> GetLtFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Lt(key, value);
		}

		private FilterDefinition<Log> GetLteFilter(string key, dynamic value) {
			return Builders<Log>.Filter.Lte(key, value);
		}

		private FilterDefinition<Log> GetAnyEqItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyEq(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAnyNeItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyNe(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAnyGtItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyGt(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAnyGteItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyGte(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAnyLtItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyLt(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAnyLteItemsFilter(string path, dynamic item) {
			return Builders<Log>.Filter.AnyLte(path, new List<dynamic>(item));
		}

		private FilterDefinition<Log> GetAndFilter(IEnumerable<FilterDefinition<Log>> filters) {
			return Builders<Log>.Filter.And(new List<FilterDefinition<Log>>(filters));
		}

		private FilterDefinition<Log> GetOrFilter(IEnumerable<FilterDefinition<Log>> filters) {
			return Builders<Log>.Filter.Or(new List<FilterDefinition<Log>>(filters));
		}

		public FilterDefinition<Log>  GetConditionFilters(QueryRulesSet queryRulesSet, IEnumerable<FilterDefinition<Log>> rules) {
			if (rules.Count() == 0) {
				return Builders<Log>.Filter.Empty;
			}
			if (queryRulesSet.Condition == "and") {
				return GetAndFilter(rules);
			}
			else {
				return GetOrFilter(rules);
			}
		}

		private dynamic GetValueByPropertyType(QueryRules rule) {
			if (rule.PropertyType == LogPropertyType.number) {
				return Int32.Parse(rule.Value);
			}
			else {
				return rule.Value;
			}
		}

		public FilterDefinition<Log> BuildFilter(QueryRules rule) {
			dynamic value = GetValueByPropertyType(rule);
			switch (rule.ObjectType) {
				case LogObjectType.jarray:
					var arrFilter = ItemsOperators.SingleOrDefault(option => option.Key == rule.Operator);
					return arrFilter.Value(rule.Field, value);
				default:
					var filter = ItemOperators.SingleOrDefault(option => option.Key == rule.Operator);
					return filter.Value(rule.Field, value);
			}
		}

	}

	#endregion

}
