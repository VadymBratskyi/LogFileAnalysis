namespace ProcessLogFilesDLL.Common {

	#region Class: LogNotify

	public class LogNotify {

		#region Properties: Public 

		public string FileName { get; }
		public string Message { get; set; }

		#endregion

		#region Constructor: Public

		public LogNotify(string fileName) {
			FileName = fileName;
		}

		#endregion

	}

	#endregion

}
