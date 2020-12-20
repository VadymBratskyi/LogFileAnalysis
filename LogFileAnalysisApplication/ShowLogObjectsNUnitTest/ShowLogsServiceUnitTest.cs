using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using NUnit.Framework;
using ShowLogObjectsDLL;
using ShowLogObjectsDLL.Models;
using System.Collections.Generic;
using System.Linq;
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
			queryRule.PropertyType = LogPropertyType.none;
			queryRule.Operator = "=";
			queryRule.Value = value;
			return queryRule;
		}

		private QueryRulesSet CreateQueryRulesSet() {
			var ruleSet = new QueryRulesSet();
			ruleSet.Condition = "and";
			ruleSet.Rules = new List<QueryRules>();
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
		public async Task GetGridLogs_Filter_Eq_MessageId_String() {
			var key = "MessageId";
			var value = "BARS-MESS-6730233";
			var paramMessageId = CreateQueryRules(key, value);
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			var expectValue = data.Data.FirstOrDefault();
			Assert.IsNotNull(data);
			Assert.AreEqual(expectValue.MessageId, value);
		}

		[Test]
		public async Task GetGridLogs_Filter_Ne_MessageId_String() {
			var key = "MessageId";
			var value = "BARS-MESS-6730233";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.Operator = "!=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			var expectValue = data.Data.FirstOrDefault(model => model.MessageId == value);
			Assert.IsNotNull(data);
			Assert.AreEqual(data.Data.Count(), 10);
			Assert.IsNull(expectValue);
		}

		[Test]
		public async Task GetGridLogs_Filter_Regex_Like_MessageId_String() {
			var key = "MessageId";
			var value = "BARS-MESS-673023";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.Operator = "like";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Eq_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "380";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.Operator = "=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Ne_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "380";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.Operator = "!=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Gt_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "380";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.Operator = ">";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Gte_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "380";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.Operator = ">=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Lt_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "1354202";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.Operator = "<";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Lte_RNK_Number() {
			var key = "Request.params.RNK";
			var value = "1354202";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.Operator = "<=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}

		[Test]
		public async Task GetGridLogs_Filter_Arr_Eq_mergedRNK_Number() {
			var key = "Request.params.mergedRNK";
			var value = "20020";
			var paramMessageId = CreateQueryRules(key, value);
			paramMessageId.PropertyType = LogPropertyType.number;
			paramMessageId.ObjectType = LogObjectType.jarray;
			paramMessageId.Operator = "=";
			filterParameters.RulesSet.Rules.Add(paramMessageId);
			var data = await showLogsService.GetGridLogs(filterParameters);
			Assert.IsNotNull(data);
			Assert.Greater(data.Data.Count(), 0);
		}
	}
}