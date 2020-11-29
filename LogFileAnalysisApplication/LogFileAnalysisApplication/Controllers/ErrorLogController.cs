using System.Threading.Tasks;
using ErrorLogObjectDLL;
using ErrorLogObjectDLL.Models;
using LogFileAnalysisApplication.Common;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LogFileAnalysisApplication.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ErrorLogController : Controller
	{

		#region Fields: Private

		private readonly ILogger<ErrorLogController> _logger;
		private readonly ErrorService _errorService;

		#endregion

		#region Constructor: Public 

		public ErrorLogController(ILogger<ErrorLogController> logger, ErrorService errorService)
		{
			_logger = logger;
			_errorService = errorService;
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllUnKnownErrorData([FromBody] FilterParameters filterParameters)
		{
			var unKnownErrorData = await _errorService.GetGridUnKnownError(filterParameters.Skip, filterParameters.Take);
			return Ok(unKnownErrorData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllKnownErrorData([FromBody] FilterParameters filterParameters)
		{
			var knownErrorData = await _errorService.GetGridKnownError(filterParameters.Skip, filterParameters.Take);
			return Ok(knownErrorData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> SetKnownErrorData([FromBody] KnownErrorConfig knownErrorConfig) {
			var knownErrorId = await _errorService.SetKnownDeleteUnKnownError(knownErrorConfig);
			return Ok(new ResponseItem(knownErrorId));
		}

		#endregion

	}
}
