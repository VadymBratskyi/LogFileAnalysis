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

		public string FileName { get; set; }

		public StatusSessionFile StatusFile { get; set; }

		#endregion

	}

	#endregion

}