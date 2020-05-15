using Newtonsoft.Json.Linq;
using SitComTech.Framework.DataContext;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Framework.Services
{
    public abstract class Service<TEntity> : IService<TEntity> where TEntity : class, IObjectState
    {
        private readonly IGenericRepository<TEntity> _repository;

        public Service(IGenericRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public virtual void Delete(TEntity entity)
        {
            _repository.Delete(entity);
        }

        public virtual void Delete(object id)
        {
            _repository.Delete(id);
        }

        public virtual TEntity Find(params object[] keyValues)
        {
            return _repository.Find(keyValues);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            entity = _repository.Insert(entity);
            return entity;
        }

        public virtual void InsertRange(IEnumerable<TEntity> entities)
        {
            _repository.InsertRange(entities);
        }

        public virtual IQueryable<TEntity> Queryable()
        {
            return _repository.Queryable();
        }

        public virtual IQueryable<TEntity> SelectQuery(string query, params object[] parameters)
        {
            return _repository.SelectQuery(query, parameters);
        }

        public virtual void Update(TEntity entity)
        {
            _repository.Update(entity);
        }

        public IQueryableEntity<TEntity> Query()
        {
            return _repository.Query();
        }

        public virtual IQueryableEntity<TEntity> Query(IQueryObject<TEntity> queryObject)
        {
            return _repository.Query(queryObject);
        }

        public virtual IQueryableEntity<TEntity> Query(Expression<Func<TEntity, bool>> query)
        {
            return _repository.Query(query);
        }

        public virtual void InsertGraphRange(IEnumerable<TEntity> entities)
        {
            _repository.InsertGraphRange(entities);
        }

        public virtual TEntity InsertOrUpdateGraph(TEntity entity)
        {
            return _repository.InsertOrUpdateGraph(entity);
        }

        public IGenericRepository<T> GetRepository<T>() where T : class, IObjectState
        {
            return _repository.GetRepository<T>();
        }
    }

    public abstract class JobService : IJobService
    {
        private readonly IUnitOfWork _unitOfWork;

        public JobService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public abstract JObject ExecuteJob(JObject jobParam);
    }
}
