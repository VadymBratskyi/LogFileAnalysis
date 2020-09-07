﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StatusErrorDLL;
using StatusErrorDLL.Models;

namespace LogFileAnalysisApplication.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class StatusesController : Controller
	{

		#region Fields: Private

		private readonly ILogger<StatusesController> _logger;
		private readonly StatusService _errorStatusService;

		#endregion

		public StatusesController(ILogger<StatusesController> logger, StatusService errorStatusService) {
			_logger = logger;
			_errorStatusService = errorStatusService;
		}


		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllErrorStatuses()
		{
			var statusesData = await _errorStatusService.GetErrorStatuses();
			return Ok(statusesData);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> SetNewErrorStatus([FromBody] StatusErrorDTO statusErrorDTO)
		{
			await _errorStatusService.SetNewErrorStatus(statusErrorDTO);
			return Ok();
		}
	}
}