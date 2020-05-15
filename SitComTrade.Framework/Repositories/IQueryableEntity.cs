using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Framework.Repositories
{
    public interface IQueryableEntity<TEntity> where TEntity : class
    {
        IQueryableEntity<TEntity> OrderBy(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy);
        IQueryableEntity<TEntity> OrderBy(string sortBy, bool reverse = false);
        IQueryableEntity<TEntity> Include(Expression<Func<TEntity, object>> expression);
        IEnumerable<TEntity> SelectPage(int page, int pageSize, out int totalCount, bool trackable = true);
        IEnumerable<TResult> Select<TResult>(Expression<Func<TEntity, TResult>> selector = null, bool trackable = true);
        IEnumerable<TEntity> Select(bool trackable = true);
        IQueryable<TEntity> SqlQuery(string query, params object[] parameters);
    }
}
