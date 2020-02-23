using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogFileAnalysisDAL.Models {
	public class Entity : IEntity {
		public ObjectId Id { get; set; }
	}
}
