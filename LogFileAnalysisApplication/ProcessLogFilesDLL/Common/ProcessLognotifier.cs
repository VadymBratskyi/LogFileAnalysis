using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson.Serialization;
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
			var offerNotify = new OfferNotify();
			foreach (var item in knownErrors) {
				var offer = new Offer();
				offer.ErrorMessage = item.Message;
				var answer = BsonSerializer.Deserialize<Answer>(item.Answer);
				offer.AnswerMessage = answer.Text;
				offerNotify.OfferMessages.Add(offer);
			}
			await _hubCaller.All.SendAsync("OfferNotification", offerNotify);
		}

		#endregion

	}

	#endregion

}
