﻿using ErrorLogObjectDLL.Models;
using ErrorLogObjectDLL.Process;
using LogFileAnalysisDAL;
using MongoDB.Bson;
using System.Linq;
using System.Threading.Tasks;
using ViewModelsDLL.Models;

namespace ErrorLogObjectDLL {
	public class ErrorService {

		#region Fields: Private

		private readonly DbContextService _dbService;
		private ErrorProcess _errorProcess;

		#endregion

		#region Properties: Private

		private ErrorProcess ErrorProcess => _errorProcess ?? (_errorProcess = new ErrorProcess(_dbService));

		#endregion

		public ErrorService(DbContextService service) {
			_dbService = service;
		}

		public async Task<DataSourceGrid<UnKnownErrorDTO>> GetGridUnKnownError(int skip, int take) {
			var unKnownErrors = await ErrorProcess.GetUnKnownErrors(skip, take);
			var dataSource = new DataSourceGrid<UnKnownErrorDTO>();
			dataSource.Data = unKnownErrors.Select(o => new UnKnownErrorDTO() {
				ObjectId = o.Id.ToString(),
				MessageId = o.MessageId,
				Message = o.Message,
				Count = o.CountFounded
			});
			dataSource.CountLogs = await _dbService.Logs.Count();
			return dataSource;
		}

		public async Task<DataSourceGrid<KnownErrorDTO>> GetGridKnownError(int skip, int take) {
			var knownErrors = await ErrorProcess.GetKnownErrors(skip, take);
			var dataSource = new DataSourceGrid<KnownErrorDTO>();
			dataSource.Data = knownErrors.Select(o => new KnownErrorDTO()
			{
				CountFounded = o.CountFounded,
				Message = o.Message
			});
			dataSource.CountLogs = await _dbService.Logs.Count();
			return dataSource;
		}

		public async Task<string> SetKnownDeleteUnKnownError(KnownErrorConfig knownErrorConfig) {
			var knownError = await ErrorProcess.SetKnownError(knownErrorConfig);
			await _dbService.UnKnownErrors.Remove(new ObjectId(knownErrorConfig.UnKnownErrorId));
			return knownError.Id.ToString();
		}

	}
}
