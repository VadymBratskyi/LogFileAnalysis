using LogFileAnalysisDAL.Models;
using LogQueryBuilderDLL;
using LogQueryBuilderDLL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShowLogObjectsDLL;
using ShowLogObjectsDLL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: ShowLogController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ShowLogController : Controller {

		#region Fields: Private

		private readonly ILogger<ShowLogController> _logger;
		private readonly ShowLogsService _showLogService;
		private readonly QueryBuildingService _queryBuildingService;

		#endregion

		#region Constructor: Public

		public ShowLogController(ILogger<ShowLogController> logger, ShowLogsService showLogsService,
			QueryBuildingService queryBuildingService) {
			_logger = logger;
			_showLogService = showLogsService;
			_queryBuildingService = queryBuildingService;
		}

		#endregion

		#region Methods: Public

		[HttpGet("[action]")]
		public async Task<QueryBuilderConfig> GetAccessFieldsForQuery() {
			return await _queryBuildingService.GetAccesFieldsForQueryBuilder();
		}

		[HttpGet("[action]")]
		public async Task<IEnumerable<QueryConfig>> GetQueryBuilderConfig() {
			return await _queryBuildingService.GetConfig();
		}
		
		[HttpPost("[action]")]
		public async Task<ActionResult> AddNewItemToQueryBuilder([FromBody] IEnumerable<QueryConfig> newqueries) {
			await _queryBuildingService.AddNewItem(newqueries);
			return Ok();
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllLogsData([FromBody] ShowLogFilterParameters filterParameters) {
			var logData = await _showLogService.GetGridLogs(filterParameters);
			return Ok(logData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetLogsDataByFilter([FromBody] QueryRulesSet rulesset) {
			var data = await _showLogService.GetGridLogsByFilter(rulesset);
			return Ok(data);
		}

		//[HttpPost("[action]")]
		//public TestValue PostTestValue([FromBody] TestValue test) {
		//	test.Value = "Hello World from ShowLogController.PostTestValue";
		//	return test;
		//}

		#endregion

	}

	#endregion

}