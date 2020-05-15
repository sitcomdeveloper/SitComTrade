using System;
using System.Data;
using System.Linq;

namespace SitComTech.Framework.DataContext
{
    public interface IDataContext : IDisposable
    {
        int SaveChanges();
        void SyncObjectState<TEntity>(TEntity entity) where TEntity : class, IObjectState;
        void SyncObjectStatePostCommit();
        IQueryable<TEntity> SQLQuery<TEntity>(string query, params object[] parameters);
        int ExecuteCommand(string query, params object[] parameters);
        DataTable ExecuteSqlProc(string procName, params object[] parameters);
    }
}
