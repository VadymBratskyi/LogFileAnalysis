using System;

namespace ProcessLogFilesDLL.ExtentionException {
	public class ExistFileException : Exception {
	
		public ExistFileException(string message) : base(message) {
		}

	}
}
