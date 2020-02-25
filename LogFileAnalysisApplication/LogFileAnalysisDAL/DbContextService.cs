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
	public class DbContextService {

		#region Fields: Private

		private readonly IMongoDatabase mongoDatabase;
		private readonly string _connectionString;
		private IGridFSBucket _gridFS;

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

		#region Methods: Public

		public async Task<byte[]> GetLogFile(string id) {
			return await _gridFS.DownloadAsBytesAsync(new ObjectId(id));
		}

		public async Task<IEnumerable<GridFSFileInfo>> GetLogFilesInfoByName(string fileName) {
			var filter = Builders<GridFSFileInfo>.Filter.Eq<string>(info => info.Filename, fileName);
			var fileInfos = await _gridFS.FindAsync(filter);
			return await fileInfos.ToListAsync();
		}

		public async Task<ObjectId> StoreLogFile(Stream logFileStream, string logFileName) {
			return await _gridFS.UploadFromStreamAsync(logFileName, logFileStream);
		}

		public async Task RemoveLogFile(ObjectId id) {
			await _gridFS.DeleteAsync(id);
		}

		public async Task RemoveLogFile(string fileName) {
			var builder = new FilterDefinitionBuilder<GridFSFileInfo>();
			var filter = Builders<GridFSFileInfo>.Filter.Eq<string>(info => info.Filename, fileName);
			var fileInfos = await _gridFS.FindAsync(filter);
			foreach (var item in await fileInfos.ToListAsync()) {
				await _gridFS.DeleteAsync(item.Id);
			}
		}

		#endregion

	}

	#endregion
}
