using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {

	#region Class: Error

	public class Error : Entity {

		#region Properties: Public

		public string Message { get; set; }

		public string Details { get; set; }

		public BsonDocument ResponsError { get; set; }

		#endregion

	}

	#endregion

}
