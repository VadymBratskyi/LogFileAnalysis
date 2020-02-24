using MongoDB.Bson;

namespace LogFileAnalysisDAL.Models {

	#region Interface : IEntity

	public interface IEntity {

		#region Properites: Public

		public ObjectId Id { get; set; }

		#endregion

	}

	#endregion

}
