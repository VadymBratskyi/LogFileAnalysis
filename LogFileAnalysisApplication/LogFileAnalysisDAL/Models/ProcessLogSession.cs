using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {
	public class ProcessLogSession : Entity {
	
		public string SessionTitle { get; set; }

		public string UserName { get; set; }

		public ProcessLogSession() {
			Id = ObjectId.GenerateNewId();
		}

	}
}
