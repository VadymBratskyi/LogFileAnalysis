using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnswerLogObjectDLL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LogFileAnalysisApplication.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("AllowOrigin")]
	public class AnsweLogController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> GetAllAnswers() {

			return Ok();
		}

		[HttpPost("[action]")]
		public async Task<ActionResult> SetNewAnswer(AnswerDTO answer)
		{

			return Ok();
		}
	}
}
