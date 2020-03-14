﻿using SitComTech.Core.Interface;
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
        private IUnitOfWork<Country> _countryrepository;
        private IUnitOfWork<Currency> _currencyrepository;
        public UserService(IUnitOfWork<User> repository, IUnitOfWork<Country> countryrepository, IUnitOfWork<Currency> currencyrepository)
        {
            this._repository = repository;
            this._countryrepository = countryrepository;
            this._currencyrepository = currencyrepository;

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
        public User IsAuthenticated(UserVM userVM)
        {           
           var userdata =  _repository.GetAll().Where(x => (x.UserName == userVM.UserName || x.Email == userVM.UserName) && x.Password == userVM.Password && x.Active == true && x.Deleted == false).FirstOrDefault();
            if (userdata != null)
                return userdata;
            else
                return null;
        }

        public List<Country> GetCountries()
        {
            return _countryrepository.GetAll().ToList();
        }

        public List<Currency> GetCurrencies()
        {
            return _currencyrepository.GetAll().Where(x => x.Active && !x.Deleted).ToList();
        }

        public string GetCountryISDCodeById(int countryid)
        {
            return _countryrepository.GetById(countryid).ISDCode;
        }
    }
}
