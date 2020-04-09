using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using System;
using System.Collections.Generic;
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

		public async Task<IEnumerable<Log>> GetLogs() {
			return await _dbService.Logs.Get();
		}

	}
}
