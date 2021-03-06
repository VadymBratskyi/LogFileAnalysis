using LogFileAnalysisDAL.Extentions;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL.Common {

	#region Class: ProcessLogNotifier

	public class ProcessLogNotifier {

		#region Fields: Private

		private readonly IHubCallerClients _hubCaller;

		#endregion

		#region COnstructor: Public

		public ProcessLogNotifier(IHubCallerClients hubCaller) {
			_hubCaller = hubCaller;
		}

		#endregion

		#region Methods: Public

		public async Task Notify(string fileName, int countObjects) {
			var logNotify = new LogNotify(fileName);
			logNotify.Message = $"Файл: {fileName} оброблено. Створенно {countObjects} об'єктів";
			await _hubCaller.All.SendAsync("ProcessNotification", logNotify);
		}

		public async Task NotifyOffers(IEnumerable<KnownError> knownErrors) {
			var offers = new List<OfferNotify>();
			foreach (var item in knownErrors) {
				var offer = new OfferNotify();
				offer.ErrorMessage = item.Message;
				var answer = item.Answer.ConvertToEntity<Answer>();
				var status = item.Status.ConvertToEntity<StatusError>();
				offer.StatusCode = status.Code;
				offer.AnswerMessage = answer.Text;
				offers.Add(offer);
			}
			await _hubCaller.All.SendAsync("OfferNotification", offers);
		}

		#endregion

	}

	#endregion

}
