using LogFileAnalysisApplication.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using ProcessLogFilesDLL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace LogFileAnalysisApplication.Controllers {

	#region Class: ProcessLogFilesController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class ProcessLogFilesController : Controller {

		#region Fields: Private

		private readonly ILogger<ProcessLogFilesController> _logger;
		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public ProcessLogFilesController(ILogger<ProcessLogFilesController> logger, DbContextService service) {
			_logger = logger;
			_dbService = service;
		}

		#endregion

		#region Method: Private

		private string GenerateFileName(string fileName, string sessionId) {
			var name = Path.GetFileNameWithoutExtension(fileName);
			var ext = Path.GetExtension(fileName);
			return string.Format("{0}_{1}{2}", name, sessionId, ext);
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> CreateProcessLogSession([FromBody]TestUser user) {
			if (user == null) {
				throw new ArgumentNullException("User name is null!!");
			}
			var randSessionIndex = new Random();
			var processLogSesion = new ProcessLogSession();
			processLogSesion.UserName = user.UserName;
			processLogSesion.SessionTitle = string.Format("Session_{0}", randSessionIndex.Next(1, 100));
			await _dbService.ProcessLogSessions.Create(processLogSesion);
			return Ok(processLogSesion.Id.ToString().ToJson());
		}


		[HttpPost("[action]")]
		public async Task<ActionResult> UploadLogFiles(IFormFileCollection files, [FromQuery(Name = "sessionId")] string sessionId) {
			if (sessionId == "undefined") {
				throw new ArgumentNullException("SessionId is null!!");
			}			
			if (files != null) {
				foreach (var file in files) {
					var fileName = GenerateFileName(file.FileName, sessionId);
					var fileId = await _dbService.StoreLogFile(file.OpenReadStream(), fileName);
					var processSesionFile = new ProcessSessionFile();
					processSesionFile.ProcessSessionId = new ObjectId(sessionId);
					processSesionFile.FileId = fileId;
					await _dbService.ProcessSessionFiles.Create(processSesionFile);
				}
			}
			return Ok("success".ToJson());
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> RemoveLogFiles(List<string> fileNames, [FromQuery(Name = "sessionId")] string sessionId) {
			if (fileNames != null) {
				foreach (var item in fileNames) {
					var fileName = GenerateFileName(item, sessionId);
					var gridFsFiles = await _dbService.GetLogFilesInfoByName(fileName);
					foreach (var fsFiles in gridFsFiles) {
						var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("FileId", fsFiles.Id);
						var processSessionFiles = await _dbService.ProcessSessionFiles.Get(queryBuilder);
						foreach (var procSessFile in processSessionFiles) {
							await _dbService.RemoveLogFile(procSessFile.FileId);
							await _dbService.ProcessSessionFiles.Remove(procSessFile.Id);
						}
					}
				}
			}
			return Ok();
		}

		#endregion

	}

	public class TestUser { 
		public string UserName { get; set; }
	}

	#endregion

}