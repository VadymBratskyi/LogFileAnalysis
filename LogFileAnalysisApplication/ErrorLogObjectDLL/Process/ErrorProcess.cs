using ErrorLogObjectDLL.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ErrorLogObjectDLL.Process
{
	class ErrorProcess {
		#region Fields: Private

		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public ErrorProcess(DbContextService service) {
			_dbService = service;
		}

		#endregion

		#region Methods: Private

		private async Task<KnownError> CreateKnownError(KnownErrorConfig knownErrorConfig) {
			var unKnownError = await _dbService.UnKnownErrors.FindById(new ObjectId(knownErrorConfig.UnKnownErrorId));
			var stausError = await _dbService.StatusErrors.FindById(new ObjectId(knownErrorConfig.StatusErrorId));
			var answer = await _dbService.Answers.FindById(new ObjectId(knownErrorConfig.AnswerId));
			return new KnownError() {
				Id = ObjectId.GenerateNewId(),
				Message = unKnownError.Message,
				CountFounded = unKnownError.CountFounded,
				Status = stausError.ToBsonDocument(),
				Answer = answer.ToBsonDocument()
			};
		}

		#endregion

		public async Task<IEnumerable<UnKnownError>> GetUnKnownErrors(int skip, int take) {
			var unKnownErrors = await _dbService.UnKnownErrors.Get(skip, take);
			return unKnownErrors;
		}

		public async Task<IEnumerable<KnownError>> GetKnownErrors(int skip, int take) {
			var knownErrors = await _dbService.KnownErrors.Get(skip, take);
			return knownErrors;
		}

		public async Task<KnownError> SetKnownError(KnownErrorConfig knownErrorConfig) {
			var knownError = await CreateKnownError(knownErrorConfig);
			await _dbService.KnownErrors.Create(knownError);
			return knownError;
		}
	}
}
