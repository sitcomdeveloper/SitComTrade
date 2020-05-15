using CommonServiceLocator;
using SitComTech.Framework.DataContext;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace SitComTech.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDataContext _dataContext;
        private AppDbContext _dbContext;
        private bool _disposed;
        private DbContextTransaction _transaction;
        private Dictionary<string, dynamic> _repositories;


        public UnitOfWork(string connectionString)
        {
            _dataContext = new AppDbContext(connectionString);
            _repositories = new Dictionary<string, dynamic>();
        }

        public void BeginTransaction()
        {
            _dbContext = ((AppDbContext)_dataContext);
            if (_dbContext.Database.Connection.State != System.Data.ConnectionState.Open)
                _dbContext.Database.Connection.Open();
            _transaction = _dbContext.Database.BeginTransaction(System.Data.IsolationLevel.Snapshot);
        }

        public void Commit()
        {
            _dataContext.SaveChanges();
            _transaction.Commit();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    if (_dataContext != null)
                    {
                        _dbContext = ((AppDbContext)_dataContext);

                        if (_dbContext.Database.Connection.State == System.Data.ConnectionState.Open)
                            _dbContext.Database.Connection.Close();

                        _dataContext.Dispose();
                        _dataContext = null;
                    }

                    if (_repositories != null)
                        _repositories = null;
                }
                _disposed = true;
            }
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class, IObjectState
        {
            if (ServiceLocator.IsLocationProviderSet)
                return ServiceLocator.Current.GetInstance<IGenericRepository<TEntity>>();

            if (_repositories == null)
                _repositories = new Dictionary<string, dynamic>();

            var type = typeof(TEntity).Name;

            if (_repositories.ContainsKey(type))
            {
                return (IGenericRepository<TEntity>)_repositories[type];
            }

            var repositoryType = typeof(GenericRepository<>);
            _repositories.Add(type, Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), this));

            return _repositories[type];
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public int SaveChanges()
        {
            return _dataContext.SaveChanges();
        }

        public IDataContext Context
        {
            get { return _dataContext; }
        }
    }
}
