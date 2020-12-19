using NUnit.Framework;
using ShowLogObjectsDLL.Models;
using LogFileAnalysisDAL.Models;
using System.Collections.Generic;
using ShowLogObjectsDLL;
using LogFileAnalysisDAL;
using System.Threading.Tasks;

namespace ShowLogObjectsNUnitTest {
	public class ShowLogsServiceUnitTests {


		private string connectionString = "mongodb://localhost:27017/LogsFileAnalysis";
		private DbContextService dbContextService;
		private ShowLogsService showLogsService;
		private ShowLogFilterParameters filterParameters;

		private QueryRules CreateQueryRules(string field, string value) {
			var queryRule = new QueryRules();
			queryRule.Field = field;
			queryRule.ObjectType = LogObjectType.none;
			queryRule.Type = LogPropertyType.none;
			queryRule.Operator = "=";
			queryRule.Value = value;
			return queryRule;
		}

		private QueryRulesSet CreateQueryRulesSet() {
			var ruleSet = new QueryRulesSet();
			ruleSet.Condition = "and";
			ruleSet.Rules = new List<QueryRules>() {
				CreateQueryRules("MessageId", "BARS-MESS-6730233")
			};
			return ruleSet;
		}

		private ShowLogFilterParameters CreateFilterParameters() {
			var filter = new ShowLogFilterParameters();
			filter.Skip = 0;
			filter.Take = 10;
			filter.RulesSet = CreateQueryRulesSet();
			return filter;
		}


		[SetUp]
		public void Setup() {
			dbContextService = new DbContextService(connectionString);
			showLogsService = new ShowLogsService(dbContextService);
			filterParameters = CreateFilterParameters();
		}

		[Test]
		public async Task Test1() {
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
		}
	}
}