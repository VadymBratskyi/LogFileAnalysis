﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnswerLogObjectDLL;
using AnswerLogObjectDLL.Models;
using ErrorLogObjectDLL;
using LogFileAnalysisApplication.Common;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LogFileAnalysisApplication.Controllers
{
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
	}
}