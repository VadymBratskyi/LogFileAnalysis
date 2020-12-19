using AnswerLogObjectDLL.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnswerLogObjectDLL.Process
{

	#region Class: AnswerProcess

	public class AnswerProcess
	{
		#region Fields: Private

		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public AnswerProcess(DbContextService service)
		{
			_dbService = service;
		}

		#endregion

		#region Methods: Private

		private Answer CreateNewAnswer(AnswerDTO newAnswer)
		{
			return new Answer()
			{
				Text = newAnswer.Text,
				StatusId = new ObjectId(newAnswer.StatusId)
			};
		}

		#endregion

		#region Methods: Public

		public async Task<IEnumerable<Answer>> GetAnswers(int skip, int take)
		{
			var answers = await _dbService.Answers.GetAsync(skip, take);
			return answers;
		}

		public async Task<Answer> AddNewAnswer(AnswerDTO newAnswerDto)
		{
			if (newAnswerDto == null)
			{
				throw new ArgumentNullException();
			}
			try
			{
				var newAnswer = CreateNewAnswer(newAnswerDto);
				await _dbService.Answers.Create(newAnswer);
				return newAnswer;
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		#endregion

	}

	#endregion

}
