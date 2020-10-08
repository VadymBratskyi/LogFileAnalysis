using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace LogFileAnalysisDAL.Extentions {

	#region Class: BsonExtentions

	public static class BsonExtentions {

		#region Methods: Public

		public static T ConvertToEntity<T>(this BsonDocument item) where T : Entity {
			return BsonSerializer.Deserialize<T>(item);
		}

		#endregion

	}

	#endregion

}
