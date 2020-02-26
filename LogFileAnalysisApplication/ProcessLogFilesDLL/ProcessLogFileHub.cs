using LogFileAnalysisDAL;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {
	public class ProcessLogFileHub : Hub {

		private readonly DbContextService _dbService;

		public ProcessLogFileHub(DbContextService dbService) {
			_dbService = dbService;
		}

		public async Task StartProcessLogFiles(string sessionId) {

			ProcessLogFile processFiles = new ProcessLogFile(_dbService, sessionId);
			await processFiles.LoadFilesFromGridFs();
			
			await this.Clients.All.SendAsync("ProcessNotification", "Hello From Server!!");
		}
	}
}
