using LogFileAnalysisApplication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace LogFileAnalysisApplication.Controllers {

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ProcessLogFilesController : Controller {

		private readonly ILogger<ProcessLogFilesController> _logger;

		public ProcessLogFilesController(ILogger<ProcessLogFilesController> logger) {
			_logger = logger;
		}

		[HttpGet("[action]")]
		public TestValue GetTestValue() {
			var test = new TestValue();
			test.Value = "Hello World from ProcessLogFilesController.GetTestValue";
			return test;
		}

		[HttpPost("[action]")]
		public TestValue PostTestValue([FromBody] TestValue test) {
			test.Value += "Hello World from ProcessLogFilesController.PostTestValue";
			return test;
		}
	}
}
