using ErrorLogObjectDLL.Process;
using LogFileAnalysisDAL;
using StatusErrorDLL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StatusErrorDLL
{
	public class StatusService {

		private readonly DbContextService _dbService;
		private ProcessErrorStatuses _procesStatuses;

		#region Properties: Private

		private ProcessErrorStatuses ProcesStatuses => _procesStatuses ?? (_procesStatuses = new ProcessErrorStatuses(_dbService));

		#endregion

		public StatusService(DbContextService service) {
			_dbService = service;
		}

		public async Task<IEnumerable<StatusTreeNode>> GetErrorStatuses() {
			var tree = await ProcesStatuses.GetErrorStatusesAsTree();
			return tree;
		}

		public async Task SetNewErrorStatus(StatusErrorDTO newStatus) {
			await ProcesStatuses.AddNewErrorStatuses(newStatus);
		}

	}
}
