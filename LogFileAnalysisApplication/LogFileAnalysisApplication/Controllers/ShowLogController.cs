﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShowLogObjectsDLL;
using System.Threading.Tasks;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: ShowLogController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ShowLogController : Controller {

		#region Fields: Private

		private readonly ILogger<ShowLogController> _logger;
		private readonly ShowLogsService _showLogService;

		#endregion

		#region Constructor: Public

		public ShowLogController(ILogger<ShowLogController> logger, ShowLogsService showLogsService) {
			_logger = logger;
			_showLogService = showLogsService;
		}

		#endregion

		#region Methods: Public

		[HttpGet("[action]")]
		public string GetTreeData() {
			_showLogService.LoadDataForTree();
			return "succes";
		}


		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllLogsData([FromBody]FilterParameters filterParameters) {
			var result = await _showLogService.GetLogs(filterParameters.Skip, filterParameters.Take);
			return Ok(result);
		}

		//[HttpPost("[action]")]
		//public TestValue PostTestValue([FromBody] TestValue test) {
		//	test.Value = "Hello World from ShowLogController.PostTestValue";
		//	return test;
		//}

		#endregion

	}

	public class FilterParameters { 
		public int Skip { get; set; }
		public int Take { get; set; }
	}

	#endregion

}