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

		#region Fields: Private

		private readonly DbContextService _dbService;
		private ProcessOffer _processOffer;

		#endregion

		#region Constructor: Public

		public ProcessAnalysisError(DbContextService dbContextService, ProcessOffer processOffer) {
			_dbService = dbContextService;
			_processOffer = processOffer;
		}

		#endregion

		#region Methods: Public

		public async Task AnalysisErrorMessage(IEnumerable<Error> errors) {
			foreach (var error in errors) {
				var unQueryBuilder = Builders<UnKnownError>.Filter.Eq(error => error.Message, error.Message);
				var unKnownErrors = await _dbService.UnKnownErrors.GetAsync(unQueryBuilder);
				var queryBuilder = Builders<KnownError>.Filter.Eq(error => error.Message, error.Message);
				var knownErrors = await _dbService.KnownErrors.GetAsync(queryBuilder);
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
					foreach (var knownerror in knownErrors) {
						var existOffer = _processOffer.getExistOffer(knownerror.Id);
						if (existOffer == null) {
							_processOffer.AddKnowErrorToOffer(knownerror);
						}
						else {
							existOffer.CountFounded++;
						}
					}
				}
			}
		}

		#endregion

	}

	#endregion

}
