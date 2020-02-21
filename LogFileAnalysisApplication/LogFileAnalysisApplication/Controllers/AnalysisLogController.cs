using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LogFileAnalysisApplication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LogFileAnalysisApplication.Controllers
{
    [Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
    public class AnalysisLogController : Controller
    {
        private readonly ILogger<AnalysisLogController> _logger;

        public AnalysisLogController(ILogger<AnalysisLogController> logger) {
            _logger = logger;
        }

		[HttpGet("[action]")]
		public TestValue GetTestValue() {
			var test = new TestValue();
			test.Value = "Hello World from AnalysisLogController.GetTestValue";
			return test;
		}

		[HttpPost("[action]")]
		public TestValue PostTestValue([FromBody] TestValue test) {
			test.Value = "Hello World from AnalysisLogController.PostTestValue";
			return test;
		}
	}
}