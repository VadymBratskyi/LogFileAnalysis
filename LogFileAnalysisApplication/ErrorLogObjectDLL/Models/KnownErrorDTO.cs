using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsDLL.Models;

namespace ErrorLogObjectDLL.Models
{
	public class KnownErrorDTO
	{
		public int CountFounded { get; set; }

		public string Message { get; set; }

		//public BsonDocument Error { get; set; }

		//public BsonDocument Status { get; set; }

		//public BsonDocument Answer { get; set; }
	}
}
