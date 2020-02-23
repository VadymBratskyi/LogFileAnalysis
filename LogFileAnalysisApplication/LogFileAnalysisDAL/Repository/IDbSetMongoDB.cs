using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {
    public interface IDbSetMongoDB<TEntity> where TEntity : class {
        Task<IEnumerable<TEntity>> Get();
        Task<IEnumerable<TEntity>> Get(Func<TEntity, bool> predicate);
        Task<TEntity> FindById(ObjectId id);
        Task Create(TEntity item);
        Task Update(TEntity item, ObjectId id);
        Task Remove(ObjectId id);

    }
}