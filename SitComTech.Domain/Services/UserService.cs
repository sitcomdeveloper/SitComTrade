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
using System.Threading.Tasks;

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

        public List<User> GetAllUsersByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId==ownerid).ToList();
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
                        Phone = userdata.Phone,
                        DeskId = userdata.DeskId,
                        IsDisabled = userdata.IsDisabled,
                        UserName = userdata.UserName,
                        IsAffiliateUser = userdata.IsAffiliateUser,
                        ImageName = userdata.ImageName,
                        LockoutEnabled = userdata.LockoutEnabled,
                        CampaignCode = userdata.CampaignCode,
                        AffiliateFieldId = userdata.AffiliateFieldId,
                        AffiliateFieldName = userdata.AffiliateFieldName,
                        DeskName = userdata.DeskName,
                        RoleId = userdata.RoleId,
                        RoleName = userdata.RoleName,
                        DepartmentId = userdata.DepartmentId,
                        DepartmentName = userdata.DepartmentName,
                        SharedDeskId = userdata.SharedDeskId,
                        SharedDeskName = userdata.SharedDeskName,
                        TimezoneId = userdata.TimezoneId,
                        TimezoneName = userdata.TimezoneName,
                        CultureCode = userdata.CultureCode,
                        CultureCodeId = userdata.CultureCodeId,
                        UiCultureCode = userdata.UiCultureCode,
                        UiCultureCodeId = userdata.UiCultureCodeId,
                        StartModuleId = userdata.StartModuleId,
                        StartModuleName = userdata.StartModuleName,
                        DefaultSenderId = userdata.DefaultSenderId,
                        DefaultSenderName = userdata.DefaultSenderName,
                        SharedSenderId = userdata.SharedSenderId,
                        SharedSenderName = userdata.SharedSenderName
                    };                    
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

        public void UpdateUser(UserDataVM entity)
        {
            User userdata = _repository.Queryable().FirstOrDefault(x=>x.Email==entity.Email);
            if (userdata != null)
            {
                userdata.UpdatedAt = DateTime.Now;
                userdata.UpdatedByName = entity.FirstName;
                userdata.FirstName = entity.FirstName;
                userdata.LastName = entity.LastName;
                userdata.Password = entity.Password;
                userdata.Email = entity.Email;
                userdata.Phone = entity.Phone;
                userdata.DeskId = entity.DeskId;
                userdata.DeskName = entity.DeskName;
                userdata.IsDisabled = entity.IsDisabled;
                userdata.UserName = entity.UserName;
                userdata.OwnerId = entity.OwnerId;
                userdata.IsAffiliateUser = entity.IsAffiliateUser;
                userdata.ImageName = entity.ImageName;
                userdata.LockoutEnabled = entity.LockoutEnabled;
                userdata.CampaignCode = entity.CampaignCode;
                userdata.AffiliateFieldId = entity.AffiliateFieldId;
                userdata.AffiliateFieldName = entity.AffiliateFieldName;
                userdata.RoleId = entity.RoleId;
                userdata.RoleName = entity.RoleName;
                userdata.DepartmentId = entity.DepartmentId;
                userdata.DepartmentName = entity.DepartmentName;
                userdata.SharedDeskId = entity.SharedDeskId;
                userdata.SharedDeskName = entity.SharedDeskName;
                userdata.TimezoneId = entity.TimezoneId;
                userdata.TimezoneName = entity.TimezoneName;
                userdata.CultureCode = entity.CultureCode;
                userdata.CultureCodeId = entity.CultureCodeId;
                userdata.UiCultureCode = entity.UiCultureCode;
                userdata.UiCultureCodeId = entity.UiCultureCodeId;
                userdata.StartModuleId = entity.StartModuleId;
                userdata.StartModuleName = entity.StartModuleName;
                userdata.DefaultSenderId = entity.DefaultSenderId;
                userdata.DefaultSenderName = entity.DefaultSenderName;
                userdata.SharedSenderId = entity.SharedSenderId;
                userdata.SharedSenderName = entity.SharedSenderName;
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
        public async Task<User> AuthUser(UserVM userVM)
        {
            var userdata = await Task.Run(() => _repository.Queryable().Where(x => (x.Email == userVM.UserName) && x.Password == userVM.Password && x.Active == true && x.Deleted == false).FirstOrDefault());
            if (userdata != null)
                return userdata;
            else
                return null;
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

        public User GetUserbyusername(string username)
        {
            return _repository.Queryable().Where(x => x.Email == username && x.Active == true && x.Deleted == false).FirstOrDefault();
        }       
    }   
}