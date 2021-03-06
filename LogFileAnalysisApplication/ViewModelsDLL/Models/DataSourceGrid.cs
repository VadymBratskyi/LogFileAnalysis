﻿using System.Collections.Generic;

namespace ViewModelsDLL.Models {

	#region Class: LogsGrid

	public class DataSourceGrid<T> {

		#region Properties: Public

		public IEnumerable<T> Data { get; set; }
		public long CountLogs { get; set; }

		#endregion

	}

	#endregion

}
