using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Driver;
using ShowLogObjectsDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShowLogObjectsDLL {
	public class ShowLogsService {

		private readonly DbContextService _dbService;

		public ShowLogsService(DbContextService service) {
			_dbService = service;
		}

		public void LoadDataForTree() {
			var data = _dbService.Logs.Get();
		}

		public async Task<IEnumerable<LogDTO>> GetLogs(int skip, int take) {
			var logs = await _dbService.Logs.Get(skip, take);
			return logs.Select(o => new LogDTO() { MessageId = o.MessageId, RequestDate = o.RequestDate, ResponseDate = o.ResponseDate });
		}

	}
}
