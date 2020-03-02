using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessLogFilesDLL.Common {
	public class LogNotify {
		public string FileName { get; }
		public string Message { get; set; }

		public LogNotify(string fileName) {
			FileName = fileName;
		}
	}
}
