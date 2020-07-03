using SitComTech.Core.Interface;
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
    public class UserService : Service<User>, IUserService
    {
        private IGenericRepository<User> _repository;
        private IGenericRepository<Country> _countryrepository;
        private IGenericRepository<Currency> _currencyrepository;
        private IGenericRepository<MarketingInfo> _marketinginforepository;
        private IUnitOfWork _unitOfWork;
        public UserService(IGenericRepository<User> repository, IGenericRepository<Country> countryrepository, IGenericRepository<Currency> currencyrepository, IGenericRepository<MarketingInfo> marketinginforepository, IUnitOfWork unitOfWork)
            : base(repository)
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
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public User GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            User user = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id);
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
                        CreatedBy = (long)userdata.OwnerId,
                        CreatedByName = "",
                        FirstName = userdata.FirstName,
                        LastName = userdata.LastName,
                        Password = userdata.Password,
                        Email = userdata.Email,
                        Phone = userdata.Phone,
                        DeskId = userdata.DeskId,
                        IsDisabled = userdata.IsDisabled,
                        UserName = userdata.UserName,
                        OwnerId = userdata.OwnerId,
                        IsAffiliateUser = userdata.IsAffiliateUser,
                        ImageName = userdata.ImageName,
                        LockoutEnabled = userdata.LockoutEnabled,
                        CampaignCode = userdata.CampaignCode,
                        AffiliateFieldId = userdata.AffiliateFieldId,
                        AffiliateFieldName = userdata.AffiliateFieldName,
                        DeskName = userdata.DeskName,
                        //RoleId = userdata.RoleId,
                        //RoleName = userdata.RoleName,
                        DepartmentId = userdata.DepartmentId,
                        DepartmentName = userdata.DepartmentName,
                        //SharedDeskId = userdata.SharedDeskId,
                        //SharedDeskName = userdata.SharedDeskName,
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
                        //SharedSenderId = userdata.SharedSenderId,
                        //SharedSenderName = userdata.SharedSenderName
                    };
                    _repository.Insert(entity);
                    entity.ObjectState = Framework.DataContext.ObjectState.Added;
                    _unitOfWork.SaveChanges();
                    foreach (var sharedDesk in userdata.userSharedDesks)
                    {
                        UserSharedDesk userSharedDesk = new UserSharedDesk
                        {
                            UserId = entity.Id,
                            SharedDeskId = sharedDesk.SharedDeskId,
                            SharedDeskName = sharedDesk.SharedDeskName,
                            Active = true,
                            Deleted = false,
                            CreatedBy = (long)userdata.OwnerId,
                            CreatedByName = "",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = null,
                            UpdatedBy = 0,
                            UpdatedByName = ""
                        };
                        _repository.GetRepository<UserSharedDesk>().Insert(userSharedDesk);
                    }
                    foreach (var role in userdata.userRoles)
                    {
                        UserRole userRole = new UserRole
                        {
                            UserId = entity.Id,
                            UserName = entity.UserName,
                            RoleId = role.RoleId,
                            RoleName = role.RoleName,
                            Active = true,
                            Deleted = false,
                            CreatedBy = (long)userdata.OwnerId,
                            CreatedByName = "",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = null,
                            UpdatedBy = 0,
                            UpdatedByName = ""
                        };
                        _repository.GetRepository<UserRole>().Insert(userRole);
                    }
                    foreach (var sharedSenderSetting in userdata.userSharedSenderSettings)
                    {
                        UserSharedSenderSetting userSharedSenderSetting = new UserSharedSenderSetting
                        {
                            UserId = entity.Id,
                            UserName = entity.UserName,
                            SenderMailId = sharedSenderSetting.SenderMailId,
                            SenderMail = sharedSenderSetting.SenderMail,
                            Active = true,
                            Deleted = false,
                            CreatedBy = (long)userdata.OwnerId,
                            CreatedByName = "",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = null,
                            UpdatedBy = 0,
                            UpdatedByName = ""
                        };
                        _repository.GetRepository<UserSharedSenderSetting>().Insert(userSharedSenderSetting);
                    }
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
            User userdata = _repository.Queryable().FirstOrDefault(x => x.Email == entity.Email);
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
                //userdata.RoleId = entity.RoleId;
                //userdata.RoleName = entity.RoleName;
                userdata.DepartmentId = entity.DepartmentId;
                userdata.DepartmentName = entity.DepartmentName;
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
                //userdata.SharedSenderId = entity.SharedSenderId;
                //userdata.SharedSenderName = entity.SharedSenderName;
                _repository.Update(userdata);
                _repository.GetRepository<UserSharedDesk>().DeleteRange(x => x.UserId == entity.Id);

                foreach (var sharedDesk in entity.userSharedDesks)
                {
                    UserSharedDesk userSharedDesk = new UserSharedDesk
                    {
                        UserId = entity.Id,
                        SharedDeskId = sharedDesk.SharedDeskId,
                        SharedDeskName = sharedDesk.SharedDeskName,
                        Active = true,
                        Deleted = false,
                        CreatedBy = (long)userdata.OwnerId,
                        CreatedByName = "",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = null,
                        UpdatedBy = 0,
                        UpdatedByName = ""
                    };
                    _repository.GetRepository<UserSharedDesk>().Insert(userSharedDesk);
                }
                _repository.GetRepository<UserRole>().DeleteRange(x => x.UserId == entity.Id);
                foreach (var role in entity.userRoles)
                {
                    UserRole userRole = new UserRole
                    {
                        UserId = entity.Id,
                        UserName = entity.UserName,
                        RoleId = role.RoleId,
                        RoleName = role.RoleName,
                        Active = true,
                        Deleted = false,
                        CreatedBy = (long)userdata.OwnerId,
                        CreatedByName = "",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = null,
                        UpdatedBy = 0,
                        UpdatedByName = ""
                    };
                    _repository.GetRepository<UserRole>().Insert(userRole);
                }
                _repository.GetRepository<UserSharedSenderSetting>().DeleteRange(x => x.UserId == entity.Id);
                foreach (var sharedSenderSetting in entity.userSharedSenderSettings)
                {
                    UserSharedSenderSetting userSharedSenderSetting = new UserSharedSenderSetting
                    {
                        UserId = entity.Id,
                        UserName = entity.UserName,
                        SenderMailId = sharedSenderSetting.SenderMailId,
                        SenderMail = sharedSenderSetting.SenderMail,
                        Active = true,
                        Deleted = false,
                        CreatedBy = (long)userdata.OwnerId,
                        CreatedByName = "",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = null,
                        UpdatedBy = 0,
                        UpdatedByName = ""
                    };
                    _repository.GetRepository<UserSharedSenderSetting>().Insert(userSharedSenderSetting);
                }
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
            return _countryrepository.Queryable().FirstOrDefault(x => x.Id == countryid).ISDCode;
        }

        public User GetUserDetailByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.Id == ownerid).FirstOrDefault();
        }

        public User GetUserbyusername(string username)
        {
            return _repository.Queryable().Where(x => x.Email == username && x.Active == true && x.Deleted == false).FirstOrDefault();
        }
        public UserDataVM GetUserById(long id)
        {
            var user = _repository.Queryable().Where(x => x.Id == id && x.Active == true && x.Deleted == false).FirstOrDefault();

            return new UserDataVM
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Password = user.Password,
                OwnerId = user.OwnerId,
                DeskId = user.DeskId,
                IsDisabled = user.IsDisabled,
                UserName = user.UserName,
                IsAffiliateUser = user.IsAffiliateUser,
                ImageName = user.ImageName,
                LockoutEnabled = user.LockoutEnabled,
                CampaignCode = user.CampaignCode,
                AffiliateFieldId = user.AffiliateFieldId,
                AffiliateFieldName = user.AffiliateFieldName,
                DeskName = user.DeskName,
                DepartmentId = user.DepartmentId,
                DepartmentName = user.DepartmentName,
                TimezoneId = user.TimezoneId,
                TimezoneName = user.TimezoneName,
                CultureCode = user.CultureCode,
                CultureCodeId = user.CultureCodeId,
                UiCultureCode = user.UiCultureCode,
                UiCultureCodeId = user.UiCultureCodeId,
                StartModuleId = user.StartModuleId,
                StartModuleName = user.StartModuleName,
                DefaultSenderId = user.DefaultSenderId,
                DefaultSenderName = user.DefaultSenderName,
                userRoles = _repository.GetRepository<UserRole>().Query(x => x.UserId == user.Id).Select(x => new UserRoleVM { RoleId = x.RoleId, RoleName = x.RoleName }).ToList(),
                userSharedDesks = _repository.GetRepository<UserSharedDesk>().Query(x => x.UserId == user.Id).Select(x => new UserSharedDeskVM { SharedDeskId = x.SharedDeskId, SharedDeskName = x.SharedDeskName }).ToList(),
                userSharedSenderSettings = _repository.GetRepository<UserSharedSenderSetting>().Query(x => x.UserId == user.Id).Select(x => new UserSharedSenderSettingVM { SenderMailId = x.SenderMailId, SenderMail = x.SenderMail }).ToList()
            };
        }
    }
    public class EmailTemplateService : Service<EmailTemplate>, IEmailTemplateService
    {
        private IGenericRepository<EmailTemplate> _repository;
        private IUnitOfWork _unitOfWork;
        public EmailTemplateService(IGenericRepository<EmailTemplate> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }
        public List<EmailTemplate> GetEmailTemplates()
        {
            return _repository.Queryable().Where(x => x.Active == true && x.Deleted == false).ToList();
        }
        public EmailTemplate GetEmailTemplateById(long Id)
        {
            return _repository.Queryable().Where(x => x.Active == true && x.Deleted == false && x.Id == Id).FirstOrDefault();
        }
        public List<EmailTemplate> GetEmailTemplatesByUserId(long UserId)
        {
            return _repository.Queryable().Where(x => x.Active == true && x.Deleted == false && x.UserId == UserId).ToList();
        }
        public EmailTemplate InsertEmailTemplate(EmailTemplate emailTemplate)
        {
            if (emailTemplate == null)
                throw new Exception("Email Template");
            var userexist = _repository.Queryable().Where(x => x.Name == emailTemplate.Name).FirstOrDefault();
            try
            {
                if (userexist == null)
                {
                    EmailTemplate template = new EmailTemplate
                    {
                        Name = emailTemplate.Name,
                        Subject = emailTemplate.Subject,
                        IsSysTemplate = emailTemplate.IsSysTemplate,
                        IsPublic = emailTemplate.IsPublic,
                        Template = emailTemplate.Template,
                        UserId = emailTemplate.UserId,
                        Active = true,
                        Deleted = false,
                        CreatedBy = 0,
                        CreatedByName = "",
                        CreatedAt = DateTime.Now,
                        UpdatedBy = 0,
                        UpdatedByName = "",
                        UpdatedAt = null
                    };
                    _repository.Insert(template);
                    int changes = _unitOfWork.SaveChanges();
                    if (changes > 0)
                    {
                        return _repository.Queryable().Where(x=>x.Active==true && x.Deleted==false && x.Name==emailTemplate.Name).FirstOrDefault();
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool UpdateEmailTemplate(EmailTemplate emailTemplate)
        {
            if (emailTemplate == null)
                throw new Exception("Email Template");
            var userexist = _repository.Queryable().Where(x => x.Id == emailTemplate.Id).FirstOrDefault();
            try
            {
                if (userexist != null)
                {
                    EmailTemplate template = new EmailTemplate
                    {
                        Id = emailTemplate.Id,
                        Name = emailTemplate.Name,
                        Subject = emailTemplate.Subject,
                        IsSysTemplate = emailTemplate.IsSysTemplate,
                        IsPublic = emailTemplate.IsPublic,
                        Template = emailTemplate.Template,
                        UserId = emailTemplate.UserId,
                        Active = true,
                        Deleted = false,
                        CreatedBy = 0,
                        CreatedByName = "",
                        CreatedAt = DateTime.Now,
                        UpdatedBy = 0,
                        UpdatedByName = "",
                        UpdatedAt = null
                    };
                    _repository.Update(template);
                    int changes = _unitOfWork.SaveChanges();
                    if (changes > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool DeleteEmailTemplate(EmailTemplate emailTemplate)
        {
            if (emailTemplate == null)
                throw new Exception("Email Template");
            var userexist = _repository.Queryable().Where(x => x.Name == emailTemplate.Name).FirstOrDefault();
            try
            {
                if (userexist != null)
                {
                    _repository.Delete(emailTemplate);
                    int changes = _unitOfWork.SaveChanges();
                    if (changes > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}