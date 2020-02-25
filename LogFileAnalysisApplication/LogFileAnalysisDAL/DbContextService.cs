using LogFileAnalysisDAL.Models;
using LogFileAnalysisDAL.Repository;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL {

	#region Class: DbContextService

	/// <summary>
	/// Connect and work with database MongoDb.
	/// </summary>
	public class DbContextService : GridFsMongoDb {

		#region Fields: Private

		private readonly IMongoDatabase mongoDatabase;
		private readonly string _connectionString;

		private DbSetMongoDB<Log> _logs;
		private DbSetMongoDB<ProcessLogSession> _processLogSession;
		private DbSetMongoDB<ProcessSessionFile> _processSessionFile;
		#endregion

		#region Properties: Public

		public DbSetMongoDB<Log> Logs => _logs ?? (_logs = new DbSetMongoDB<Log>(mongoDatabase, "Logs"));

		public DbSetMongoDB<ProcessLogSession> ProcessLogSessions => _processLogSession ?? (_processLogSession = new DbSetMongoDB<ProcessLogSession>(mongoDatabase, "ProcessLogSessions"));

		public DbSetMongoDB<ProcessSessionFile> ProcessSessionFiles => _processSessionFile ?? (_processSessionFile = new DbSetMongoDB<ProcessSessionFile>(mongoDatabase, "ProcessSessionFiles"));

		#endregion

		#region Constructor: Public

		public DbContextService(string connectionString) {
			_connectionString = connectionString;
			if (_connectionString == null) {
				throw new ArgumentNullException("ConnectionString is Null!!");
			}
			var connection = new MongoUrlBuilder(_connectionString);
			MongoClient client = new MongoClient(_connectionString);
			mongoDatabase = client.GetDatabase(connection.DatabaseName);
			_gridFS = new GridFSBucket(mongoDatabase);
		}

		#endregion

	}

	#endregion
}
