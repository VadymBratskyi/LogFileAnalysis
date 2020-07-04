using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogsGrid

	public class LogsGrid<T> {

		#region Properties: Public

		public IEnumerable<T> LogData { get; set; }
		public long CountLogs { get; set; }

		#endregion

	}

	#endregion

}
