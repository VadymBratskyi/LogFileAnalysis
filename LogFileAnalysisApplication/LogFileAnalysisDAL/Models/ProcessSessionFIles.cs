using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {
	public class ProcessSessionFile : Entity {

		public ObjectId ProcessSessionId { get; set; }

		public ObjectId FileId { get; set; }

	}
}
