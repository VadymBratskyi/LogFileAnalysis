using LogFileAnalysisApplication.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
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
		public async Task<ActionResult> UploadLogFiles(IFormFileCollection files) {
			var log = await _dbService.Logs.Get();
			//var log = _dbService.GetById(new ObjectId("5e518db31d277a1ff4f041d9"));
			
			//if (files != null) {
			//	foreach (var file in files) {
			//		await _dbService.StoreLogFile(new ObjectId("5e518db31d277a1ff4f041d9"), file.OpenReadStream(), file.Name);
			//	}
			//}
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

	#endregion

}