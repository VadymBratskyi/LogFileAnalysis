using LogFileAnalysisDAL;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using ProcessLogFilesDLL.Common;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {

	#region Class: ProcessLogFileHub

	public class ProcessLogFileHub : Hub {

		#region Fields: Private

		private readonly DbContextService _dbService;
		private ProcessLogNotifier _processLogNotifier;

		#endregion

		#region Properties: Private

		private ProcessLogNotifier ProcessLogNotifier => _processLogNotifier ?? (_processLogNotifier = new ProcessLogNotifier(Clients));

		#endregion

		#region Constructor: Public 

		public ProcessLogFileHub(DbContextService dbService) {
			_dbService = dbService;
		}

		#endregion

		#region Methods: Public

		public async Task StartProcessLogFiles(string sessionId) {
			var id = string.IsNullOrEmpty(sessionId) ? ObjectId.Empty : new ObjectId(sessionId);
			ProcessLogFile processFiles = new ProcessLogFile(_dbService, id, ProcessLogNotifier);
			await processFiles.RunProcessLogFiles();
		}

		public async Task StartProcessSinglLogFiles(string fileName) {
			ProcessLogFile processFiles = new ProcessLogFile(_dbService, fileName, ProcessLogNotifier);
			await processFiles.RunProcessSinglLogFile();
		}

		#endregion

	}

	#endregion

}

