using LogFileAnalysisDAL;
using ShowLogObjectsDLL.Models;
using System.Linq;
using System.Threading.Tasks;
using ShowLogObjectsDLL.Process;

namespace ShowLogObjectsDLL {

	#region Class: ShowLogsService

	public class ShowLogsService {

		private readonly DbContextService _dbService;
		private readonly ProcessLogTree _processLogTree;

		public ShowLogsService(DbContextService service) {
			_dbService = service;
			_processLogTree = new ProcessLogTree();
		}

		public void LoadDataForTree() {
			var data = _dbService.Logs.Get();
		}

		public async Task<LogsGrid<LogDTO>> GetGridLogs(int skip, int take) {
			var logs = await _dbService.Logs.Get(skip, take);
			var logGrid = new LogsGrid<LogDTO>();
			logGrid.LogData = logs.Select(o => new LogDTO() {
				MessageId = o.MessageId,
				RequestDate = o.RequestDate,
				Request = _processLogTree.GetTree(o.Request),
				ResponseDate = o.ResponseDate,
				Response = _processLogTree.GetTree(o.Response)
			});
			logGrid.CountLogs = await _dbService.Logs.Count();
			return logGrid;
		}

		public async Task<LogsGrid<UnKnownErrorDTO>> GetGridUnKnownError(int skip, int take) {
			var logs = await _dbService.UnKnownErrors.Get(skip, take);
			var logGrid = new LogsGrid<UnKnownErrorDTO>();
			logGrid.LogData = logs.Select(o => new UnKnownErrorDTO() {
				MessageId = o.MessageId,
				Message = o.Message,
				Count = o.CountFounded
			});
			logGrid.CountLogs = await _dbService.Logs.Count();
			return logGrid;
		}

	}

	#endregion

}
