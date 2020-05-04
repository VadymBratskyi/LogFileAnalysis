using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {
	public class LogsGrid {

		public IEnumerable<LogDTO> LogData { get; set; }
		public long CountLogs { get; set; }

	}
}
