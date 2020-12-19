using System.Threading.Tasks;
using AnswerLogObjectDLL;
using AnswerLogObjectDLL.Models;
using ErrorLogObjectDLL;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ViewModelsDLL.Models;

namespace LogFileAnalysisApplication.Controllers
{

	#region Class : AnsweLogController

	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class AnsweLogController : Controller
	{
		#region Fields: Private

		private readonly ILogger<AnsweLogController> _logger;
		private readonly ErrorService _errorService;
		private readonly AnswerServices _answerServices;

		#endregion

		#region Constructor: Public 

		public AnsweLogController(ILogger<AnsweLogController> logger, AnswerServices answerServices)
		{
			_logger = logger;
			_answerServices = answerServices;
		}

		#endregion

		#region Methods: Public

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllAnswers([FromBody] FilterParameters filterParameters) {
			var answers = await _answerServices.GetGridAnswers(filterParameters.Skip, filterParameters.Take);
			return Ok(answers);
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> SetNewAnswer([FromBody]AnswerDTO answerDto) {
			var answerId = await _answerServices.SetNewAnswer(answerDto);
			return Ok(new ResponseItem(answerId));
		}

		#endregion

	}

	#endregion

}
