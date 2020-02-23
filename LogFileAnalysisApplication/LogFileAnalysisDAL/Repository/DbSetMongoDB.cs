using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {
	public class DbSetMongoDB<TEntity> : IDbSetMongoDB<TEntity> where TEntity : class {
		
		private readonly IMongoDatabase _mongoDatabase;
		private readonly IMongoCollection<TEntity> _entities;

		public DbSetMongoDB(IMongoDatabase mongoDatabase, string schemaName) {
			_mongoDatabase = mongoDatabase;
			_entities = _mongoDatabase.GetCollection<TEntity>(schemaName);
		}

		public async Task Create(TEntity item) {
			await _entities.InsertOneAsync(item);
		}

		public async Task<TEntity> FindById(ObjectId id) {
			return await _entities.Find(new BsonDocument("_id", id)).FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<TEntity>> Get() {
			var builder = new FilterDefinitionBuilder<TEntity>();
			var filter = builder.Empty; 
			return await _entities.Find(filter).ToListAsync();
		}

		public async Task<IEnumerable<TEntity>> Get(Func<TEntity, bool> predicate) {
			var builder = new FilterDefinitionBuilder<TEntity>();
			//var filter = filterDefinition ?? builder.Empty;
			var filter = builder.Empty;
			return await _entities.Find(filter).ToListAsync();
		}

		public async Task Remove(ObjectId id) {
			await _entities.DeleteOneAsync(new BsonDocument("_id", id));
		}

		public async Task Update(TEntity item, ObjectId id) {
			await _entities.ReplaceOneAsync(new BsonDocument("_id", id), item);
		}
	}
}
