using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using ProcessLogFilesDLL;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: ProcessLogFilesController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ProcessLogFilesController : Controller {

		#region Fields: Private

		private readonly ILogger<ProcessLogFilesController> _logger;
		private readonly LogFileService _logService;

		#endregion

		#region Constructor: Public

		public ProcessLogFilesController(ILogger<ProcessLogFilesController> logger, LogFileService logService) {
			_logger = logger;
			_logService = logService;
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> CreateProcessLogSession([FromBody]TestUser user) {
			if (user == null) {
				throw new ArgumentNullException("CreateProcessLogSession User name is null!!");
			}
			var sessionId = await _logService.CreateProcessLogSession(user.UserName);
			return Ok(sessionId.ToJson());
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> UploadLogFiles(IFormFileCollection files, [FromQuery(Name = "sessionId")] string sessionId) {
			if (sessionId == "undefined") {
				throw new ArgumentNullException("UploadLogFiles SessionId is null!!");
			}
			var result = await _logService.UploadFile(files, sessionId);
			return Ok(result);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> RemoveLogFiles(List<string> fileNames) {
			var result = await _logService.RemoveFiles(fileNames);
			return Ok(result);
		}

		#endregion

	}

	public class TestUser { 
		public string UserName { get; set; }
	}

	#endregion

}