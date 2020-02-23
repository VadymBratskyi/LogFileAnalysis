using LogFileAnalysisApplication.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System;
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
					var fileId = await _dbService.StoreLogFile(file.OpenReadStream(), file.FileName);
					var processSesionFile = new ProcessSessionFile();
					processSesionFile.ProcessSessionId = new ObjectId(sessionId);
					processSesionFile.FileId = fileId;
					await _dbService.ProcessSessionFiles.Create(processSesionFile);
				}
			}
			return Ok("success".ToJson());
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> RemoveLogFiles(string fileNames, [FromQuery(Name = "sessionId")] string sessionId) {

			if (fileNames != null) {
				//// путь к папке Files
				//string path = "/Files/" + uploadedFile.FileName;
				//// сохраняем файл в папку Files в каталоге wwwroot
				//using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
				//{
				//    await uploadedFile.CopyToAsync(fileStream);
				//}
				//FileModel file = new FileModel { Name = uploadedFile.FileName, Path = path };
				//_context.Files.Add(file);
				//_context.SaveChanges();
			}


			return Ok();

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

		#endregion

	}

	public class TestUser { 
		public string UserName { get; set; }
	}

	#endregion

}