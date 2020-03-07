using SitComTech.Data.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Data.Repository
{
    public class UnitOfWork<TEntity> : IUnitOfWork<TEntity> where TEntity : class
    {
        private IDbContext Context;
        private IDbSet<TEntity> Entities
        {
            get
            {
                return this.Context.Set<TEntity>();
            }
        }
        public UnitOfWork(IDbContext context)
        {
            this.Context = context;
        }

        public IQueryable<TEntity> GetAll()
        {
            return Entities.AsQueryable();
        }
        public TEntity GetById(object Id)
        {
            return Entities.Find(Id);
        }
        public void Insert(TEntity entity)
        {
            Entities.Add(entity);
        }
        public void Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Entity");
            this.Context.SaveChanges();
        }
        public void Delete(TEntity entity)
        {
            Entities.Remove(entity);
        }
        public virtual void SaveChanges()
        {
            try
            {
                this.Context.SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += Environment.NewLine + string.Format("Property: {0} Error: {1}",validationError.PropertyName,validationError.ErrorMessage);
                    }
                    var fail = new Exception(msg, dbEx);
                    throw fail;
                }
            }
        }

        
    }
}
