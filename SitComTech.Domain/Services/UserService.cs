using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SitComTech.Domain.Services
{
    public class UserService : Service<User>,IUserService
    {
        private IGenericRepository<User> _repository;
        private IGenericRepository<Country> _countryrepository;
        private IGenericRepository<Currency> _currencyrepository;
        private IGenericRepository<MarketingInfo> _marketinginforepository;
        private IUnitOfWork _unitOfWork;
        public UserService(IGenericRepository<User> repository, IGenericRepository<Country> countryrepository, IGenericRepository<Currency> currencyrepository, IGenericRepository<MarketingInfo> marketinginforepository,IUnitOfWork unitOfWork)
            :base(repository)
        {
            this._repository = repository;
            this._countryrepository = countryrepository;
            this._currencyrepository = currencyrepository;
            this._marketinginforepository = marketinginforepository;
            this._unitOfWork = unitOfWork;
        }
        public IQueryable<User> GetAll()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted);
        }
       
        public User GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            User user = _repository.Queryable().FirstOrDefault(x=>x.Id==(long)Id);
            return user;
        }       
        public UserDataVM InsertUser(UserDataVM userdata)
        {
            try
            {
                var userexist = _repository.Queryable().Where(x => x.Email == userdata.Email).FirstOrDefault();
                if (userexist == null)
                {
                    if (userdata == null)
                        throw new ArgumentNullException("User");                    
                    User entity = new User
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        FirstName = userdata.FirstName,
                        LastName = userdata.LastName,
                        Password = userdata.Password,
                        Email = userdata.Email,
                        CurrencyId = userdata.CurrencyId,
                        CurrencyName = userdata.CurrencyName,
                        CountryId = userdata.CountryId,
                        CountryName = userdata.CountryName,    
                        Enabled = true,
                        TypeName="Real",
                        FirstRegistrationDate =DateTime.Now,
                        RegistrationType = "Direct",
                        Promocode = userdata.Promocode,
                        Phone = userdata.Phone,
                        ResponseStatusId = 7,
                        ResponseStatus = "Interested",
                    };
                    entity.CreatedAt = DateTime.Now;
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                }
                return userdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateUser(User entity)
        {
            User userdata = _repository.Queryable().FirstOrDefault(x=>x.Id==entity.Id);
            if (userdata != null)
            {
                userdata.UpdatedAt = DateTime.Now;
                userdata.UpdatedBy = entity.OwnerId;
                userdata.UpdatedByName = entity.FirstName;
                _repository.Update(userdata);
                _unitOfWork.SaveChanges();
            }
        }

        public void DeleteUser(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public List<User> IsAuthenticated(UserVM userVM)
        {
            var userdata = _repository.Queryable().Where(x => (x.Email == userVM.UserName) && x.Password == userVM.Password && x.Active == true && x.Deleted == false).FirstOrDefault();
            if (userdata != null)
                return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
            else
                return null;
        }

        public List<Country> GetCountries()
        {
            return _countryrepository.Queryable().ToList();
        }

        public List<Currency> GetCurrencies()
        {
            return _currencyrepository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public string GetCountryISDCodeById(int countryid)
        {
            return _countryrepository.Queryable().FirstOrDefault(x=>x.Id==countryid).ISDCode;
        }

        public User GetUserDetailByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.Id == ownerid).FirstOrDefault();
        }

        public List<UserResponseStatus> GetLeadStatusList()
        {
            //var dpfRep = _repository.GetRepository<UserResponseStatus>();
            //return dpfRep.Query(x => x.Active).Select().ToList();

            return null;
        }

        public List<User> GetTradeAccountByType(TradeAccountVM tradeVM)
        {
            return _repository.Queryable().Where(x => (x.TypeName == tradeVM.TypeName) && x.OwnerId == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
        }

        public User GetUserbyusername(string username)
        {
            return _repository.Queryable().Where(x => x.Email == username && x.Active == true && x.Deleted == false).FirstOrDefault();
        }       
    }   
}