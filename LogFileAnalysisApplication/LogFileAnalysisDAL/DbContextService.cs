using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

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

		#region Methods: Public

		public async Task<IEnumerable<Log>> GetEntities(int? minPrice, int? maxPrice, string name) {

			// строитель фильтров
			var builder = new FilterDefinitionBuilder<Log>();
			var filter = builder.Empty; // фильтр для выборки всех документов
										// фильтр по имени
			if (!String.IsNullOrWhiteSpace(name)) {
				filter = filter & builder.Regex("Name", new BsonRegularExpression(name));
			}
			if (minPrice.HasValue)  // фильтр по минимальной цене
			{
				filter = filter & builder.Gte("Price", minPrice.Value);
			}
			if (maxPrice.HasValue)  // фильтр по максимальной цене
			{
				filter = filter & builder.Lte("Price", maxPrice.Value);
			}

			return await Logs.Find(filter).ToListAsync();
		}

		// получаем один документ по id
		public async Task<Log> GetEntity(ObjectId id) {
			return await Logs.Find(new BsonDocument("_id", id)).FirstOrDefaultAsync();
		}

		// добавление документа
		public async Task Create(Log log) {
			await Logs.InsertOneAsync(log);
		}

		// обновление документа
		public async Task Update(Log log) {
			await Logs.ReplaceOneAsync(new BsonDocument("_id", log.Id), log);
		}

		// удаление документа
		public async Task Remove(ObjectId id) {
			await Logs.DeleteOneAsync(new BsonDocument("_id", id));
		}

		//получение изображения
		public async Task<byte[]> GetLogFile(string id) {
			return await _gridFS.DownloadAsBytesAsync(new ObjectId(id));
		}

		// сохранение изображения
		public async Task StoreLogFile(ObjectId id, Stream logFileStream, string imageName) {
			Log log = await GetEntity(id);
			if (log.LogFileId != ObjectId.Empty) {
				// если ранее уже была прикреплена картинка, удаляем ее
				await _gridFS.DeleteAsync(log.LogFileId);
			}
			// сохраняем изображение
			ObjectId logFileId = await _gridFS.UploadFromStreamAsync(imageName, logFileStream);
			// обновляем данные по документу
			log.LogFileId = logFileId;
			var filter = Builders<Log>.Filter.Eq("_id", log.Id);
			var update = Builders<Log>.Update.Set("LogFileId", log.LogFileId);
			await Logs.UpdateOneAsync(filter, update);
		}


		#endregion

	}

	#endregion
}
