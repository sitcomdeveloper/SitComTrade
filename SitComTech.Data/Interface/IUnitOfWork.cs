using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Data.Interface
{
    public interface IUnitOfWork<TEntity> where TEntity:class
    {
        IQueryable<TEntity> GetAll();
        TEntity GetById(object Id);
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void SaveChanges();
    }
}
