using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Domain.Services
{
    public class UserService:IUserService
    {
        private IUnitOfWork<User> _repository;
        public UserService(IUnitOfWork<User> repository)
        {
            this._repository = repository;
        }
        public IQueryable<User> GetAll()
        {
            return _repository.GetAll().Where(x=>x.Active && !x.Deleted);
        }

        public User GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            User user = _repository.GetById(Id);
            return user;
        }
        public void Insert(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Insert(entity);
        }
        public UserDataVM Insert(UserDataVM userdata)
        {
            try
            {
                if (userdata == null)
                    throw new ArgumentNullException("User");
                User entity = new User();
                entity.Active = true;
                entity.Deleted = false;
                entity.CreatedAt = DateTime.Now;
                entity.CreatedBy = 0;
                entity.CreatedByName = "";
                entity.FirstName = userdata.FirstName;
                entity.LastName = userdata.LastName;
                entity.Password = userdata.Password;
                entity.Email = userdata.Email;
                entity.Country = userdata.Country;
                entity.FtdAmount = userdata.Currency;
                entity.Promocode = userdata.Promocode;
                entity.CreatedAt = DateTime.Now;
                _repository.Insert(entity);
                SaveChanges();
                return userdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Update(entity);
        }

        public void Delete(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Delete(entity);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }
        public bool IsAuthenticated(UserVM userVM)
        {
            return _repository.GetAll().Where(x => (x.UserName == userVM.UserName || x.Email == userVM.UserName) && x.Password == userVM.Password && x.Active == true && x.Deleted == false).Count() == 1;
        }

    }
}
