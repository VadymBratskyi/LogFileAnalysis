using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Driver;
using ShowLogObjectsDLL.Models;
using ShowLogObjectsDLL.QueryBuildProcess;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModelsDLL.Models;
using ViewModelsDLL.Process;

namespace ShowLogObjectsDLL {

	#region Class: ShowLogsService

	public class ShowLogsService {

		#region Fields: Private

		private readonly DbContextService _dbService;
		private readonly ProcessLogTree _processLogTree;
		private ShowLogFilterBuilder _showLogFilterBuilder;

		#endregion

		#region Properties: Private

		private ShowLogFilterBuilder ShowLogFilterBuilder => _showLogFilterBuilder ?? (_showLogFilterBuilder = new ShowLogFilterBuilder());

		#endregion

		#region Constructor: Public

		public ShowLogsService(DbContextService service) {
			_dbService = service;
			_processLogTree = new ProcessLogTree();
		}

		#endregion

		#region Methods: Public

		public async Task<DataSourceGrid<LogDTO>> GetGridLogs(ShowLogFilterParameters parameters) {
			List<FilterDefinition<Log>> rules = new List<FilterDefinition<Log>>();
			FilterDefinition<Log> filter;
			foreach (var rule in parameters.RulesSet.Rules) {
				rules.Add(ShowLogFilterBuilder.BuildFilter(rule));
			}
			filter = ShowLogFilterBuilder.GetConditionFilters(parameters.RulesSet, rules);
			var logs = await _dbService.Logs.GetAsync(filter, parameters.Skip, parameters.Take);
			var dataSource = new DataSourceGrid<LogDTO>();
			dataSource.Data = logs.Select(o => new LogDTO() {
				MessageId = o.MessageId,
				RequestDate = o.RequestDate,
				Request = _processLogTree.GetTree(o.Request),
				ResponseDate = o.ResponseDate,
				Response = _processLogTree.GetTree(o.Response)
			});
			dataSource.CountLogs = await _dbService.Logs.Count(filter);
			return dataSource;
		}

		#endregion

	}

	#endregion

}
