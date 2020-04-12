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

        public List<UserListVM> GetAllUsersByOwnerId(long ownerid)
        {
            return _repository.GetAll().Join(_repository.GetAll(),users=>users.OwnerId,owner=>owner.Id,
                (users,owner)=>new { Users=users,Owner=owner})
                .GroupJoin(_marketinginforepository.GetAll(),userowner=>userowner.Users.Id,mrktinfo=>mrktinfo.OwnerId,
                (userowner,mrktinfo)=>new { UserOwner= userowner,MarketInfo=mrktinfo })
                .SelectMany(x=>x.MarketInfo.DefaultIfEmpty(),(x,y)=>new {x.UserOwner,MarketInfo=y})
            .Where(x => x.UserOwner.Users.Active && !x.UserOwner.Users.Deleted && x.UserOwner.Users.OwnerId == ownerid).Select(x=>
            new UserListVM
            {
                ItemId=x.UserOwner.Users.ItemId,
                FirstName = x.UserOwner.Users.FirstName,
                LastName = x.UserOwner.Users.LastName,
                CountryName = x.UserOwner.Users.CountryName,
                Email = x.UserOwner.Users.Email,
                TypeName = x.UserOwner.Users.TypeName,
                Phone = x.UserOwner.Users.Phone,
                OwnerName = x.UserOwner.Owner.FirstName+" "+x.UserOwner.Owner.LastName,
                ResponseStatus = x.UserOwner.Users.ResponseStatus,
                CreatedDate = x.UserOwner.Users.CreatedAt,
                CampaignId = x.MarketInfo.CampaignID,
                Tag = x.MarketInfo.Tag1,
                Tag1 =x.MarketInfo.Tag2,
                FTD = x.UserOwner.Users.FTD,
                Group = "",
                Desk = x.UserOwner.Users.Desk
            }).ToList();
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
                entity.UpdatedAt = DateTime.Now;
                entity.UpdatedBy = userdata.OwnerId;
                entity.UpdatedByName = userdata.FirstName;
                _repository.Update(entity);
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

    public class MarketingInfoService : IMarketingInfoService
    {
        private IUnitOfWork<MarketingInfo> _repository;
        public MarketingInfoService(IUnitOfWork<MarketingInfo> repository)
        {
            this._repository = repository;

        }
        public void Delete(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MarketingInfo> GetAll()
        {
            return _repository.GetAll();
        }

        public MarketingInfo GetById(object ownerId)
        {
            throw new NotImplementedException();
        }

        public MarketingInfo GetMarketingInfoByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public MarketingInfo InsertMarketingInfo(MarketingInfo marketingdata)
        {
            try
            {
                var marketingdataexist = _repository.GetAll().Where(x => x.OwnerId == marketingdata.OwnerId).FirstOrDefault();
                if (marketingdataexist == null)
                {
                    if (marketingdata == null)
                        throw new ArgumentNullException("User");
                    MarketingInfo entity = new MarketingInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = marketingdata.OwnerId,
                    };
                    _repository.Insert(entity);
                    SaveChanges();
                    return entity;
                }
                return marketingdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }

    public class AdditionalInfoService : IAdditionalInfoService
    {
        private IUnitOfWork<AdditionalInfo> _repository;
        public AdditionalInfoService(IUnitOfWork<AdditionalInfo> repository)
        {
            this._repository = repository;

        }
        public void Delete(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<AdditionalInfo> GetAll()
        {
            return _repository.GetAll();
        }

        public AdditionalInfo GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public AdditionalInfo InsertAdditionalInfo(AdditionalInfo additionaldata)
        {
            try
            {
                var additionaldataexist = _repository.GetAll().Where(x => x.OwnerId == additionaldata.OwnerId).FirstOrDefault();
                if (additionaldataexist == null)
                {
                    if (additionaldata == null)
                        throw new ArgumentNullException("User");
                    AdditionalInfo entity = new AdditionalInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = additionaldata.OwnerId,
                    };
                    _repository.Insert(entity);
                    SaveChanges();
                    return entity;
                }
                return additionaldata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class EmailService : IEmailService
    {
        private IUnitOfWork<Email> _repository;
        public EmailService(IUnitOfWork<Email> repository)
        {
            this._repository = repository;

        }
        public void Delete(Email entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Email> GetAll()
        {
            return _repository.GetAll();
        }

        public Email GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public Email GetEmailByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(Email entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(Email entity)
        {
            throw new NotImplementedException();
        }
    }
    public class ShortMessageService : IShortMessageService
    {
        private IUnitOfWork<ShortMessage> _repository;
        public ShortMessageService(IUnitOfWork<ShortMessage> repository)
        {
            this._repository = repository;

        }
        public void Delete(ShortMessage entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ShortMessage> GetAll()
        {
            return _repository.GetAll();
        }

        public ShortMessage GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public ShortMessage GetShortMessageByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(ShortMessage entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(ShortMessage entity)
        {
            throw new NotImplementedException();
        }
    }
}
