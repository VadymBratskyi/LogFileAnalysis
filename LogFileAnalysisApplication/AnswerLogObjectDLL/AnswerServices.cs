using LogFileAnalysisDAL;

namespace AnswerLogObjectDLL
{

	#region Class: AnswerServices

	public class AnswerServices
	{

		#region Fields: Private

		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public AnswerServices(DbContextService service)
		{
			_dbService = service;
		}

		#endregion

	}

	#endregion

}
