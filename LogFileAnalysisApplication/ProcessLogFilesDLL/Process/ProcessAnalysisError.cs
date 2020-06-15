using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL.Process {

	#region Class: ProcessAnalysisError

	public class ProcessAnalysisError {

		private readonly DbContextService _dbService;

		public ProcessAnalysisError(DbContextService dbContextService) {
			_dbService = dbContextService;
		}

		public async Task AnalysisErrorMessage(IEnumerable<Error> errors) {

			foreach (var error in errors) {

				var unQueryBuilder = Builders<UnKnownError>.Filter.Eq("Message", error.Message);
				var unKnownErrors = await _dbService.UnKnownErrors.Get(unQueryBuilder);

				var queryBuilder = Builders<KnownError>.Filter.Eq("Message", error.Message);
				var knownErrors = await _dbService.KnownErrors.Get(queryBuilder);

				if (!unKnownErrors.Any() && !knownErrors.Any()) {

					var unError = new UnKnownError() {
						MessageId = error.MessageId,
						Message = error.Message,
						Error = error.ResponsError,
						CountFounded = 1
					};

					await _dbService.UnKnownErrors.Create(unError);

				} else if (unKnownErrors.Any()) {

					foreach (var item in unKnownErrors) {

						item.CountFounded++;
						if (item.Id != ObjectId.Empty) {
							item.IsModified = true;
						}

						await _dbService.UnKnownErrors.Update(item, item.Id);
					}

				} else if (knownErrors.Any()) { 


				}

			}

		}

	}

	#endregion

}
