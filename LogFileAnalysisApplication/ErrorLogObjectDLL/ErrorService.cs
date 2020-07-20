using ErrorLogObjectDLL.Models;
using LogFileAnalysisDAL;
using System.Linq;
using System.Threading.Tasks;
using ViewModelsDLL.Models;

namespace ErrorLogObjectDLL {
	public class ErrorService {

		private readonly DbContextService _dbService;

		public ErrorService(DbContextService service) {
			_dbService = service;
		}

		public async Task<DataSourceGrid<UnKnownErrorDTO>> GetGridUnKnownError(int skip, int take) {
			var logs = await _dbService.UnKnownErrors.Get(skip, take);
			var dataSource = new DataSourceGrid<UnKnownErrorDTO>();
			dataSource.LogData = logs.Select(o => new UnKnownErrorDTO() {
				ObjectId = o.Id.ToString(),
				MessageId = o.MessageId,
				Message = o.Message,
				Count = o.CountFounded
			});
			dataSource.CountLogs = await _dbService.Logs.Count();
			return dataSource;
		}

	}
}
