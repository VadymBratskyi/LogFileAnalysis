using LogFileAnalysisDAL;
using System;

namespace ShowLogObjectsDLL {
	public class ShowLogsService {

		private readonly DbContextService _dbService;

		public ShowLogsService(DbContextService service) {
			_dbService = service;
		}

		public void LoadDataForTree() {
			var data = _dbService.Logs.Get();
		}

	}
}
