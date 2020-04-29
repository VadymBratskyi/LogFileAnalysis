﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ShowLogObjectsDLL.Models {

	#region Class: LogDTO

	public class LogDTO {

		public string MessageId { get; set; }
		public DateTime RequestDate { get; set; }
		public IEnumerable<LogTreeNode> Request { get; set; }
		public DateTime ResponseDate { get; set; }
		public IEnumerable<LogTreeNode> Response { get; set; }

	}

	#endregion

}
