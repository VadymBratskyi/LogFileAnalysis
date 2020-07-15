using ErrorLogObjectDLL;
using ErrorLogObjectDLL.Models;
using LogFileAnalysisApplication.Common;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShowLogObjectsDLL;
using System.Threading.Tasks;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: AnalysisLogController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class AnalysisLogController : Controller {

		#region Fields: Private

		private readonly ILogger<AnalysisLogController> _logger;
		private readonly ShowLogsService _showLogService;
		private readonly ErrorService _errorService;
		private readonly ErrorStatusService _errorStatusService;

		#endregion

		#region Constructor: Public 

		public AnalysisLogController(ILogger<AnalysisLogController> logger, ShowLogsService showLogsService, ErrorService errorService, ErrorStatusService errorStatusService) {
			_logger = logger;
			_showLogService = showLogsService;
			_errorService = errorService;
			_errorStatusService = errorStatusService;
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllUnKnownErrorData([FromBody]FilterParameters filterParameters) {
			var unKnownErrorData = await _errorService.GetGridUnKnownError(filterParameters.Skip, filterParameters.Take);
			return Ok(unKnownErrorData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllKnownErrorData([FromBody]FilterParameters filterParameters) {
			var logData = await _showLogService.GetGridLogs(filterParameters.Skip, filterParameters.Take);
			return Ok(logData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllErrorStatuses() {
			var statusesData = await _errorStatusService.GetErrorStatuses();
			return Ok(statusesData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> SetNewErrorStatus([FromBody]StatusErrorDTO statusErrorDTO) {
			await _errorStatusService.SetNewErrorStatus(statusErrorDTO);
			return Ok();
		}

		//[HttpGet("[action]")]
		//public TestValue GetTestValue() {
		//	var test = new TestValue();
		//	test.Value = "Hello World from AnalysisLogController.GetTestValue";
		//	return test;
		//}

		//[HttpPost("[action]")]
		//public object PostTestValue([FromBody] object test) {
		//	test.Value = "Hello World from AnalysisLogController.PostTestValue";
		//	return test;
		//}

		#endregion

	}

	#endregion

}