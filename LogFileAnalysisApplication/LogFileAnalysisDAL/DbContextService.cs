﻿using LogFileAnalysisDAL.Models;
using LogFileAnalysisDAL.Repository;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;

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
		private DbSetMongoDB<Error> _errors;
		private DbSetMongoDB<UnKnownError> _unKnownError;
		private DbSetMongoDB<KnownError> _knownError;
		private DbSetMongoDB<Answer> _answer;
		private DbSetMongoDB<StatusError> _statusError;
		private DbSetMongoDB<LogQuery> _logQuery; 
		private DbSetMongoDB<QueryConfig> _queryConfig;
		#endregion

		#region Properties: Public

		public IGridFSBucket GridFs => _gridFS;

		public DbSetMongoDB<Log> Logs => _logs ?? (_logs = new DbSetMongoDB<Log>(mongoDatabase, "Logs"));

		public DbSetMongoDB<ProcessLogSession> ProcessLogSessions => _processLogSession ?? (_processLogSession = new DbSetMongoDB<ProcessLogSession>(mongoDatabase, "ProcessLogSessions"));

		public DbSetMongoDB<ProcessSessionFile> ProcessSessionFiles => _processSessionFile ?? (_processSessionFile = new DbSetMongoDB<ProcessSessionFile>(mongoDatabase, "ProcessSessionFiles"));

		public DbSetMongoDB<Error> Errors => _errors ?? (_errors = new DbSetMongoDB<Error>(mongoDatabase, "Errors"));

		public DbSetMongoDB<UnKnownError> UnKnownErrors => _unKnownError ?? (_unKnownError = new DbSetMongoDB<UnKnownError>(mongoDatabase, "UnKnownErrors"));

		public DbSetMongoDB<KnownError> KnownErrors => _knownError ?? (_knownError = new DbSetMongoDB<KnownError>(mongoDatabase, "KnownErrors"));

		public DbSetMongoDB<Answer> Answers => _answer ?? (_answer = new DbSetMongoDB<Answer>(mongoDatabase, "Answers"));

		public DbSetMongoDB<StatusError> StatusErrors => _statusError ?? (_statusError = new DbSetMongoDB<StatusError>(mongoDatabase, "StatusError"));

		public DbSetMongoDB<LogQuery> LogQueries => _logQuery ?? (_logQuery = new DbSetMongoDB<LogQuery>(mongoDatabase, "LogQuery"));

		public DbSetMongoDB<QueryConfig> QueryConfigs => _queryConfig ?? (_queryConfig = new DbSetMongoDB<QueryConfig>(mongoDatabase, "QueryConfig"));

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
