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

		#endregion

		#region Constructor: Public 

		public AnalysisLogController(ILogger<AnalysisLogController> logger, ShowLogsService showLogsService) {
			_logger = logger;
			_showLogService = showLogsService;
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllUnKnownErrorData([FromBody]FilterParameters filterParameters) {
			var unKnownErrorData = await _showLogService.GetGridUnKnownError(filterParameters.Skip, filterParameters.Take);
			return Ok(unKnownErrorData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllKnownErrorData([FromBody]FilterParameters filterParameters) {
			var logData = await _showLogService.GetGridLogs(filterParameters.Skip, filterParameters.Take);
			return Ok(logData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllErrorStatuses() {
			var statusesData = await _showLogService.GetErrorStatuses();
			return Ok(statusesData);
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