using SitComTech.Framework.DataContext;
using SitComTech.Framework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Linq.Expressions;

namespace SitComTech.Data.Repository
{
    public class QueryableEntity<TEntity> : IQueryableEntity<TEntity> where TEntity : class, IObjectState
    {
        #region Private Fields
        private readonly Expression<Func<TEntity, bool>> _expression;
        private readonly List<Expression<Func<TEntity, object>>> _includes;
        private readonly GenericRepository<TEntity> _repository;
        private Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> _orderBy;
        private string _sortByProperty;
        private string _sortInReverse;
        private Expression<Func<TEntity, Int64>> _thenBy;
        private Expression<Func<TEntity, string>> _thenByStringTypeProp;
        private Expression<Func<TEntity, DateTime>> _thenByDateTimeTypeProp;
        private Expression<Func<TEntity, bool>> _thenByBoolTypeProp;
        private Expression<Func<TEntity, decimal>> _thenByDecimalTypeProp;
        private int _thenByType = 0;
        #endregion Private Fields

        #region Constructors
        public QueryableEntity(GenericRepository<TEntity> repository)
        {
            _repository = repository;
            _includes = new List<Expression<Func<TEntity, object>>>();
        }

        public QueryableEntity(GenericRepository<TEntity> repository, IQueryObject<TEntity> queryObject)
            : this(repository)
        {
            _expression = queryObject.Query();
        }

        public QueryableEntity(GenericRepository<TEntity> repository, Expression<Func<TEntity, bool>> expression)
            : this(repository)
        {
            _expression = expression;
        }
        #endregion Constructors

        public IQueryableEntity<TEntity> Include(Expression<Func<TEntity, object>> expression)
        {
            _includes.Add(expression);
            return this;
        }

        public IQueryableEntity<TEntity> OrderBy(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy)
        {
            _orderBy = orderBy;
            return this;
        }

        public IQueryableEntity<TEntity> OrderBy(string sortBy, bool reverse = false)
        {
            _sortByProperty = sortBy;
            _sortInReverse = reverse ? " descending" : "";
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(OrderedQuery);
            return this;
        }

        public IQueryableEntity<TEntity> ThenBy(Expression<Func<TEntity, Int64>> sortKey)
        {
            _thenBy = sortKey;
            _thenByType = 1;
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(ThenByOrderedQuery);
            return this;
        }

        public IQueryableEntity<TEntity> ThenBy(Expression<Func<TEntity, string>> sortKey)
        {
            _thenByStringTypeProp = sortKey;
            _thenByType = 2;
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(ThenByOrderedQuery);
            return this;
        }

        public IQueryableEntity<TEntity> ThenBy(Expression<Func<TEntity, DateTime>> sortKey)
        {
            _thenByDateTimeTypeProp = sortKey;
            _thenByType = 3;
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(ThenByOrderedQuery);
            return this;
        }
        public IQueryableEntity<TEntity> ThenBy(Expression<Func<TEntity, bool>> sortKey)
        {
            _thenByBoolTypeProp = sortKey;
            _thenByType = 4;
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(ThenByOrderedQuery);
            return this;
        }
        public IQueryableEntity<TEntity> ThenBy(Expression<Func<TEntity, decimal>> sortKey)
        {
            _thenByDecimalTypeProp = sortKey;
            _thenByType = 5;
            _orderBy = new Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>(ThenByOrderedQuery);
            return this;
        }
        private IOrderedQueryable<TEntity> OrderedQuery(IQueryable<TEntity> arg)
        {
            return (IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse);
        }

        private IOrderedQueryable<TEntity> ThenByOrderedQuery(IQueryable<TEntity> arg)
        {
            if (_thenByType == 1)
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse)).ThenBy(_thenBy);
            else if (_thenByType == 2)
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse)).ThenBy(_thenByStringTypeProp);
            else if (_thenByType == 3)
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse)).ThenBy(_thenByDateTimeTypeProp);
            else if (_thenByType == 4)
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse)).ThenBy(_thenByBoolTypeProp);
            else if (_thenByType == 5)
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse)).ThenBy(_thenByDecimalTypeProp);
            else
                return ((IOrderedQueryable<TEntity>)arg.OrderBy(_sortByProperty + _sortInReverse));
        }

        public IEnumerable<TEntity> Select(bool trackable = false)
        {
            return _repository.Select(_expression, _orderBy, _includes, null, null, trackable);
        }

        public IEnumerable<TResult> Select<TResult>(Expression<Func<TEntity, TResult>> selector = null, bool trackable = false)
        {
            return _repository.Select(_expression, _orderBy, _includes, null, null, trackable).Select(selector);
        }

        public IEnumerable<TEntity> SelectPage(int page, int pageSize, out int totalCount, bool trackable = false)
        {
            totalCount = _repository.Select(_expression).Count();
            return _repository.Select(_expression, _orderBy, _includes, page, pageSize, trackable);
        }

        public IQueryable<TEntity> SqlQuery(string query, params object[] parameters)
        {
            return _repository.SelectQuery(query, parameters).AsQueryable();
        }
    }
}
