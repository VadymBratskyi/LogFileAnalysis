using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {

	#region Class : DbSetMongoDB<TEntity>

	public class DbSetMongoDB<TEntity> : IDbSetMongoDB<TEntity> where TEntity : class {

		#region Fields: Private

		private readonly IMongoDatabase _mongoDatabase;
		public  IMongoCollection<TEntity> _entities;

		#endregion

		#region Constructor : Public

		public DbSetMongoDB(IMongoDatabase mongoDatabase, string schemaName) {
			_mongoDatabase = mongoDatabase;
			_entities = _mongoDatabase.GetCollection<TEntity>(schemaName);
		}

		#endregion

		#region Methods: Public

		public async Task Create(TEntity item) {
			await _entities.InsertOneAsync(item);
		}

		public async Task Create(IEnumerable<TEntity> items) {
			await _entities.InsertManyAsync(items);
		}

		public async Task<TEntity> FindById(ObjectId id) {
			return await _entities.Find(new BsonDocument("_id", id)).FirstOrDefaultAsync();
		}

		public async Task<long> Count() {
			var builder = new FilterDefinitionBuilder<TEntity>();
			var filter = builder.Empty;
			return await _entities.Find(filter).CountDocumentsAsync();
		}

		public async Task<long> Count(FilterDefinition<TEntity> filterDefenition) {
			if (filterDefenition == null) {
				throw new ArgumentNullException("FilterDefenition is null!!");
			}
			return await _entities.Find(filterDefenition).CountDocumentsAsync();
		}

		public async Task<IEnumerable<TEntity>> Get(int skip = 0, int take = Int32.MaxValue) {
			var builder = new FilterDefinitionBuilder<TEntity>();
			var filter = builder.Empty;
			return await _entities.Find(filter).Skip(skip).Limit(take).ToListAsync();
		}

		public async Task<IEnumerable<TEntity>> Get(FilterDefinition<TEntity> filterDefenition) {
			if (filterDefenition == null) {
				throw new ArgumentNullException("FilterDefenition is null!!");
			}
			return await _entities.Find(filterDefenition).ToListAsync();
		}

		public async Task Remove(ObjectId id) {
			await _entities.DeleteOneAsync(new BsonDocument("_id", id));
		}

		public async Task Update(TEntity item, ObjectId id) {
			await _entities.ReplaceOneAsync(new BsonDocument("_id", id), item);
		}

		#endregion

	}

	#endregion

}