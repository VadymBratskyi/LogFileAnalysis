using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using System.Collections.Generic;

namespace ProcessLogFilesDLL.Process {

	#region Class: ProcessOffer

	public class ProcessOffer {

		#region Fields: Private

		private List<KnownError> _offerKnownError;

		#endregion

		#region Constructor: Public

		public ProcessOffer() {
			_offerKnownError = new List<KnownError>();
		}

		#endregion

		#region Methods: Public

		public KnownError getExistOffer(ObjectId errorId) { 
			return _offerKnownError.Find(model => model.Id == errorId);
		} 

		public void AddKnowErrorToOffer(KnownError knownError) {
			_offerKnownError.Add(knownError);
		}

		public IEnumerable<KnownError> GetOffers() {
			return _offerKnownError;
		}

		#endregion

	}

	#endregion

}
