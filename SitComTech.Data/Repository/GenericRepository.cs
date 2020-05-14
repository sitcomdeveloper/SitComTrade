using LinqKit;
using SitComTech.Framework.DataContext;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace SitComTech.Data.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IObjectState
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected DbSet<TEntity> _dbSet;
        protected IDataContext _context;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _context = _unitOfWork.Context;
            if (_context is AppDbContext dbContext)
                _dbSet = dbContext.Set<TEntity>();
        }


        public virtual IQueryable<TEntity> SelectQuery(string query, params object[] parameters)
        {
            return _dbSet.SqlQuery(query, parameters).AsNoTracking().AsQueryable();
        }

        public virtual TEntity Find(params object[] keyvalues)
        {
            return _dbSet.Find(keyvalues);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            entity.ObjectState = ObjectState.Added;
            var retEntity = _dbSet.Attach(entity);
            _context.SyncObjectState(entity);
            return retEntity;
        }

        public void InsertGraphRange(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
        }

        public virtual void InsertRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Insert(entity);
            }
        }

        public virtual TEntity InsertOrUpdateGraph(TEntity entity)
        {
            SyncObjectGraph(entity);
            _entitesChecked = null;
            return _dbSet.Attach(entity);
        }

        // tracking of all processed entities in the object graph when calling SyncObjectGraph
        HashSet<object> _entitesChecked;

        private void SyncObjectGraph(object entity) // scan object graph for all 
        {
            // instantiating _entitesChecked so we can keep track of all entities we have scanned, avoid any cyclical issues
            if (_entitesChecked == null)
                _entitesChecked = new HashSet<object>();

            // if already processed skip
            if (_entitesChecked.Contains(entity))
                return;

            // add entity to alreadyChecked collection
            _entitesChecked.Add(entity);

            var objectState = entity as IObjectState;

            // discovered entity with ObjectState.Added, sync this with provider e.g. EF
            if (objectState != null && objectState.ObjectState == ObjectState.Added)
                _context.SyncObjectState((IObjectState)entity);

            // Set tracking state for child collections
            foreach (var prop in entity.GetType().GetProperties())
            {
                // Apply changes to 1-1 and M-1 properties
                var trackableRef = prop.GetValue(entity, null) as IObjectState;
                if (trackableRef != null)
                {
                    // discovered entity with ObjectState.Added, sync this with provider e.g. EF
                    if (trackableRef.ObjectState == ObjectState.Added)
                        _context.SyncObjectState((IObjectState)entity);

                    // recursively process the next property
                    SyncObjectGraph(prop.GetValue(entity, null));
                }

                // Apply changes to 1-M properties
                var items = prop.GetValue(entity, null) as IEnumerable<IObjectState>;

                // collection was empty, nothing to process, continue
                if (items == null) continue;

                // collection isn't empty, continue to recursively scan the elements of this collection
                foreach (var item in items)
                    SyncObjectGraph(item);
            }
        }

        public virtual void Update(TEntity entity)
        {
            entity.ObjectState = ObjectState.Modified;
            _dbSet.Attach(entity);
            _context.SyncObjectState(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            entity.ObjectState = ObjectState.Deleted;
            _dbSet.Attach(entity);
            _context.SyncObjectState(entity);
        }

        public virtual void Delete(object id)
        {
            var entity = Find(id);
            Delete(entity);
        }

        public void DeleteRange(Expression<Func<TEntity, bool>> predicate)
        {
            var list = _dbSet.Where(predicate).ToList();
            foreach (var item in list)
            {
                Delete(item);
            }
        }

        internal IQueryable<TEntity> Select(
             Expression<Func<TEntity, bool>> filter = null,
             Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
             List<Expression<Func<TEntity, object>>> includes = null,
             int? page = null,
             int? pageSize = null, bool trackable = false)
        {
            IQueryable<TEntity> query = _dbSet;

            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            if (!trackable)
                query = query.AsNoTracking();

            if (orderBy != null)
            {
                query = orderBy(query);
            }
            if (filter != null)
            {
                query = query.AsExpandable().Where(filter);
            }
            if (page != null && pageSize != null)
            {
                query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }
            return query;
        }

        public IQueryable<TEntity> Queryable()
        {
            return _dbSet.AsNoTracking();
        }

        public IQueryableEntity<TEntity> Query()
        {
            return new QueryableEntity<TEntity>(this);
        }

        public virtual IQueryableEntity<TEntity> Query(Expression<Func<TEntity, bool>> predicate)
        {
            return new QueryableEntity<TEntity>(this, predicate);
        }

        public virtual IQueryableEntity<TEntity> Query(IQueryObject<TEntity> queryObject)
        {
            return new QueryableEntity<TEntity>(this, queryObject);
        }

        public IGenericRepository<T> GetRepository<T>() where T : class, IObjectState
        {
            return _unitOfWork.Repository<T>();
        }

        public IQueryable<T> RawQuery<T>(string query, params object[] parameters)
        {
            return _context.SQLQuery<T>(query, parameters).AsQueryable();
        }

        public DataTable ExecuteSQLProc(string procName, params object[] parameters)
        {
            return _context.ExecuteSqlProc(procName, parameters);
        }
        public int ExecuteCommand(string query, params object[] parameters)
        {
            return _context.ExecuteCommand(query, parameters);
        }
    }
}
