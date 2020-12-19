using ErrorLogObjectDLL.Process;
using LogFileAnalysisDAL;
using StatusErrorDLL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StatusErrorDLL
{

	#region Class: StatusService

	public class StatusService {

		#region Fields: Private

		private readonly DbContextService _dbService;
		private ProcessErrorStatuses _procesStatuses;

		#endregion

		#region Properties: Private

		private ProcessErrorStatuses ProcesStatuses => _procesStatuses ?? (_procesStatuses = new ProcessErrorStatuses(_dbService));

		#endregion

		#region Constructor: Public

		public StatusService(DbContextService service) {
			_dbService = service;
		}

		#endregion

		#region Methods: Public

		public async Task<IEnumerable<StatusTreeNode>> GetErrorStatuses() {
			var tree = await ProcesStatuses.GetErrorStatusesAsTree();
			return tree;
		}

		public async Task SetNewErrorStatus(StatusErrorDTO newStatus) {
			await ProcesStatuses.AddNewErrorStatuses(newStatus);
		}

		#endregion

	}

	#endregion

}
