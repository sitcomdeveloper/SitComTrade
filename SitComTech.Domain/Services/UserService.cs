using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SitComTech.Domain.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork<User> _repository;
        private IUnitOfWork<Country> _countryrepository;
        private IUnitOfWork<Currency> _currencyrepository;
        private IUnitOfWork<MarketingInfo> _marketinginforepository;
        public UserService(IUnitOfWork<User> repository, IUnitOfWork<Country> countryrepository, IUnitOfWork<Currency> currencyrepository,IUnitOfWork<MarketingInfo> marketinginforepository)
        {
            this._repository = repository;
            this._countryrepository = countryrepository;
            this._currencyrepository = currencyrepository;
            this._marketinginforepository = marketinginforepository;
        }
        public IQueryable<User> GetAll()
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted);
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
                var userexist = _repository.GetAll().Where(x => x.Email == userdata.Email).FirstOrDefault();
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
                    SaveChanges();
                }
                return userdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(User entity)
        {
            User userdata = _repository.GetById(entity.Id);
            if (userdata != null)
            {
                userdata.UpdatedAt = DateTime.Now;
                userdata.UpdatedBy = entity.OwnerId;
                userdata.UpdatedByName = entity.FirstName;
                _repository.Update(userdata);
                SaveChanges();
            }
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
        public List<User> IsAuthenticated(UserVM userVM)
        {
            var userdata = _repository.GetAll().Where(x => (x.Email == userVM.UserName) && x.Password == userVM.Password && x.Active == true && x.Deleted == false).FirstOrDefault();
            if (userdata != null)
                return _repository.GetAll().Where(x => x.Active && !x.Deleted).ToList();
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

        public User GetUserDetailByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.Id == ownerid).FirstOrDefault();
        }

        public List<UserResponseStatus> GetLeadStatusList()
        {
            //var dpfRep = _repository.GetRepository<UserResponseStatus>();
            //return dpfRep.Query(x => x.Active).Select().ToList();

            return null;
        }

        public List<User> GetTradeAccountByType(TradeAccountVM tradeVM)
        {
            return _repository.GetAll().Where(x => (x.TypeName == tradeVM.TypeName) && x.OwnerId == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
        }

        public User GetUserbyusername(string username)
        {
            return _repository.GetAll().Where(x => x.Email == username && x.Active == true && x.Deleted == false).FirstOrDefault();
        }
    }
   
}
