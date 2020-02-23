using LogFileAnalysisDAL.Models;
using LogFileAnalysisDAL.Repository;
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

		private readonly IMongoDatabase mongoDatabase;
		private readonly string _connectionString;
		private IGridFSBucket _gridFS;

		private DbSetMongoDB<Log> _logs;
		#endregion

		#region Properties: Public

		public DbSetMongoDB<Log> Logs => _logs ?? (_logs = new DbSetMongoDB<Log>(mongoDatabase, "Logs"));

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

		//public async Task<byte[]> GetLogFile(string id) {
		//	return await _gridFS.DownloadAsBytesAsync(new ObjectId(id));
		//}

		//public async Task StoreLogFile(ObjectId id, Stream logFileStream, string imageName) {
		//	//Log log = await GetById(id);
		//	//if (log.LogFileId != ObjectId.Empty) {
		//	//	// если ранее уже была прикреплена картинка, удаляем ее
		//	//	await _gridFS.DeleteAsync(log.LogFileId);
		//	//}
		//	//// сохраняем изображение
		//	//ObjectId logFileId = await _gridFS.UploadFromStreamAsync(imageName, logFileStream);
		//	//// обновляем данные по документу
		//	//log.LogFileId = logFileId;
		//	//var filter = Builders<Log>.Filter.Eq("_id", log.Id);
		//	//var update = Builders<Log>.Update.Set("LogFileId", log.LogFileId);
		//	//await Logs.UpdateOneAsync(filter, update);
		//}


		#endregion

	}

	#endregion
}
