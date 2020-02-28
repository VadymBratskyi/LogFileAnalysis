using LogFileAnalysisDAL;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using System.Threading;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {
	public class ProcessLogFileHub : Hub {

		private readonly DbContextService _dbService;

		public ProcessLogFileHub(DbContextService dbService) {
			_dbService = dbService;
		}

		public async Task StartProcessLogFiles(string sessionId) {
			var id = string.IsNullOrEmpty(sessionId) ? ObjectId.Empty : new ObjectId(sessionId);
			ProcessLogFile processFiles = new ProcessLogFile(_dbService, id, this.Clients);
			await processFiles.RunProcessLogFiles();
		}

		public async Task StartProcessSinglLogFiles(string fileName) {
			ProcessLogFile processFiles = new ProcessLogFile(_dbService, fileName, this.Clients);
			await processFiles.RunProcessSinglLogFile();
		}
	}
}
