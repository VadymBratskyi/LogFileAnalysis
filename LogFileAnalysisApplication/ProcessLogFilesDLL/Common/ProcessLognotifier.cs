using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL.Common {
	public class ProcessLogNotifier {

		private readonly IHubCallerClients _hubCaller;

		public ProcessLogNotifier(IHubCallerClients hubCaller) {
			_hubCaller = hubCaller;
		}

		public async Task Notify(string fileName, int countObjects) {
			var logNotify = new LogNotify(fileName);
			logNotify.Message = $"Файл: {fileName} оброблено. Створенно {countObjects} об'єктів";
			await _hubCaller.All.SendAsync("ProcessNotification", logNotify);
		}

	}
}
