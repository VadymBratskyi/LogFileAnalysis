using LogFileAnalysisDAL.Models;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;

namespace LogFileAnalysisDAL {

	#region Class: DbContextService

	/// <summary>
	/// Connect and work with database MongoDb.
	/// </summary>
	public class DbContextService {

		#region Fields: Private

		private IGridFSBucket _gridFS;
		private string _connectionString;

		#endregion

		#region Properties: Public

		public IMongoCollection<Log> Logs { get; set; }

		#endregion

		#region Constructor: Public

		public DbContextService(string connectionString) {
			_connectionString = connectionString;
			InitConection();
		}

		#endregion

		#region Methods: Private

		private void InitConection() {
			if (_connectionString == null) {
				throw new ArgumentNullException("ConnectionString is Null!!");
			}
			var connection = new MongoUrlBuilder(_connectionString);
			MongoClient client = new MongoClient(_connectionString);
			IMongoDatabase mongoDatabase = client.GetDatabase(connection.DatabaseName);
			_gridFS = new GridFSBucket(mongoDatabase);
			Logs = mongoDatabase.GetCollection<Log>("Logs");
		}

		#endregion

	}

	#endregion
}
