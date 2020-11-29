using AnswerLogObjectDLL.Models;
using AnswerLogObjectDLL.Process;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using ViewModelsDLL.Models;

namespace AnswerLogObjectDLL
{

	#region Class: AnswerServices

	public class AnswerServices
	{

		#region Fields: Private

		private readonly DbContextService _dbService;
		private AnswerProcess _answerProcess;

		#endregion

		#region Properties: Private

		private AnswerProcess AnswerProcess => _answerProcess ?? (_answerProcess = new AnswerProcess(_dbService));

		#endregion


		#region Constructor: Public

		public AnswerServices(DbContextService service)
		{
			_dbService = service;
		}

		#endregion

		#region Methods: Public

		public async Task<DataSourceGrid<AnswerDTO>> GetGridAnswers(int skip, int take)
		{
			var answers = await AnswerProcess.GetAnswers(skip, take);
			var dataSource = new DataSourceGrid<AnswerDTO>();
			dataSource.Data = answers.Select(o => new AnswerDTO()
			{
				StatusId = o.StatusId.ToString(),
				Text = o.Text,
			});
			dataSource.CountLogs = await _dbService.Answers.Count();
			return dataSource;
		}

		public async Task<string> SetNewAnswer(AnswerDTO answerDTO)
		{
			var newAnswer = await AnswerProcess.AddNewAnswer(answerDTO);
			return newAnswer.Id.ToString();
		}

		#endregion

	}

	#endregion

}
