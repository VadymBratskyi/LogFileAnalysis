using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL.Common {
	public class ProcessLogNotifier {

		private readonly IHubCallerClients _hubCaller;

		public ProcessLogNotifier(IHubCallerClients hubCaller) {
			_hubCaller = hubCaller;
		}

		public async Task Notify(string message) {
			await _hubCaller.All.SendAsync("ProcessNotification", message);
		}

	}
}
