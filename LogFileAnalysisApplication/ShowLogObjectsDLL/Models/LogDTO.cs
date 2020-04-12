using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogDTO

	public class LogDTO {

		public string MessageId { get; set; }
		public DateTime RequestDate { get; set; }
		public LogTree Request { get; set; }
		public DateTime ResponseDate { get; set; }
		public LogTree Response { get; set; }

	}

	#endregion

}
