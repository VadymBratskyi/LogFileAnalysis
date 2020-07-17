using LogFileAnalysisDAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnswerLogObjectDLL.Process
{
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
	}
}
