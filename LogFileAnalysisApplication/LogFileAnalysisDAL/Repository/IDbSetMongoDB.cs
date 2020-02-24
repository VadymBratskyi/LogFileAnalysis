using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {

    #region Interface : IDbSetMongoDB<TEntity>

    public interface IDbSetMongoDB<TEntity> where TEntity : class {

        #region Methods: Public

        Task<IEnumerable<TEntity>> Get();
        Task<IEnumerable<TEntity>> Get(Func<TEntity, bool> predicate);
        Task<TEntity> FindById(ObjectId id);
        Task Create(TEntity item);
        Task Update(TEntity item, ObjectId id);
        Task Remove(ObjectId id);

        #endregion

    }

    #endregion

}