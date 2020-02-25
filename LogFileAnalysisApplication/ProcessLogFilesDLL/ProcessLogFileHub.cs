using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {
	public class ProcessLogFileHub : Hub {

		public async Task StartProcessLogFiles(string sessionId) {

			for (int i = 0; i < 5; i++) {
				Thread.Sleep(2000);
				await this.Clients.All.SendAsync("ProcessNotification", sessionId + i);
			}

		}
	}
}
