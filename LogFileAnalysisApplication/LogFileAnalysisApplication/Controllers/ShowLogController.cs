using LogFileAnalysisApplication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: ShowLogController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ShowLogController : Controller {

		#region Fields: Private

		private readonly ILogger<ShowLogController> _logger;

		#endregion

		#region Constructor: Public

		public ShowLogController(ILogger<ShowLogController> logger) {
			_logger = logger;
		}

		#endregion

		#region Methods: Public

		[HttpGet("[action]")]
		public TestValue GetTestValue() {
			var test = new TestValue();
			test.Value = "Hello World from ShowLogController.GetTestValue";
			return test;
		}

		[HttpPost("[action]")]
		public TestValue PostTestValue([FromBody] TestValue test) {
			test.Value = "Hello World from ShowLogController.PostTestValue";
			return test;
		}

		#endregion

	}

	#endregion

}