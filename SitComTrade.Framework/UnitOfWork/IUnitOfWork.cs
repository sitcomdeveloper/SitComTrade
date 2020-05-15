using SitComTech.Framework.DataContext;
using SitComTech.Framework.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Framework.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
        void BeginTransaction();
        void Commit();
        void Rollback();
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class, IObjectState;
        IDataContext Context { get; }
    }
}
