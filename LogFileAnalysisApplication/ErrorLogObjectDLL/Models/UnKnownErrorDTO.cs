﻿using ViewModelsDLL.Models;

namespace ErrorLogObjectDLL.Models {

	#region: UnKnownErrorDTO

	public class UnKnownErrorDTO : DataDTO {

		#region Properties: Public

		public string ObjectId { get; set; }
		public int Count { get; set; }
		public string Message { get; set; }

		#endregion

	}

	#endregion

}
