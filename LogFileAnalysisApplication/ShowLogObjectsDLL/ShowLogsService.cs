using LogFileAnalysisDAL;
using ShowLogObjectsDLL.Models;
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

		#endregion

		#region Constructor: Public

		public ShowLogsService(DbContextService service) {
			_dbService = service;
			_processLogTree = new ProcessLogTree();
		}

		#endregion

		#region Fields: Public

		public async Task<DataSourceGrid<LogDTO>> GetGridLogs(int skip, int take) {
			var logs = await _dbService.Logs.GetAsync(skip, take);
			var dataSource = new DataSourceGrid<LogDTO>();
			dataSource.Data = logs.Select(o => new LogDTO() {
				MessageId = o.MessageId,
				RequestDate = o.RequestDate,
				Request = _processLogTree.GetTree(o.Request),
				ResponseDate = o.ResponseDate,
				Response = _processLogTree.GetTree(o.Response)
			});
			dataSource.CountLogs = await _dbService.Logs.Count();
			return dataSource;
		}

		#endregion

	}

	#endregion

}
