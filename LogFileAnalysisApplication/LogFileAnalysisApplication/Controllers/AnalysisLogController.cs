using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShowLogObjectsDLL;

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