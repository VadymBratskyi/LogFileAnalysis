using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {

	#region Class : ProcessSessionFile

	public class ProcessSessionFile : Entity {

		#region Properties: Public

		public ObjectId ProcessSessionId { get; set; }

		public ObjectId FileId { get; set; }

		#endregion

	}

	#endregion

}