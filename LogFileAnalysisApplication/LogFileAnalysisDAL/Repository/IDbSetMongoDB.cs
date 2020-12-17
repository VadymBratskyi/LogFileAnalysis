using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {

    #region Interface : IDbSetMongoDB<TEntity>

    public interface IDbSetMongoDB<TEntity> where TEntity : class {

        #region Methods: Public

        Task<long> Count();
        Task<long> Count(FilterDefinition<TEntity> filterDefenition);
        IEnumerable<TEntity> Get(int skip, int take);
        Task<IEnumerable<TEntity>> GetAsync(int skip, int take);
        //Task<IEnumerable<TEntity>> Get(Func<TEntity, bool> predicate); //todo
        IEnumerable<TEntity> Get(FilterDefinition<TEntity> filterDefenition, int skip, int take);
        Task<IEnumerable<TEntity>> GetAsync(FilterDefinition<TEntity> filterDefenition, int skip, int take);
        TEntity GetSingle(FilterDefinition<TEntity> filterDefenition);
        Task<TEntity> GetSingleAsync(FilterDefinition<TEntity> filterDefenition);
         Task<TEntity> FindById(ObjectId id);
        Task Create(TEntity item);
        Task Create(IEnumerable<TEntity> entities);
        Task Update(TEntity item, ObjectId id);
        Task Remove(ObjectId id);

        #endregion

    }

    #endregion

}