﻿using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IService<User>
    {
        Task<User> AuthUser(UserVM userVM);
        List<User> IsAuthenticated(UserVM userVM);
        UserDataVM InsertUser(UserDataVM userDataVM);
        List<Country> GetCountries();
        List<Currency> GetCurrencies();
        string GetCountryISDCodeById(int countryid);

        User GetUserDetailByOwnerId(long ownerid);

        User GetUserbyusername(string username);
        void UpdateUser(UserDataVM entity);
        void DeleteUser(User entity);
        List<User> GetAllUsersByOwnerId(long ownerid);
        UserDataVM GetUserById(long ownerid);
    }
    public interface IEmailTemplateService : IService<EmailTemplate>
    {
        List<EmailTemplate> GetEmailTemplates();
        List<EmailTemplate> GetEmailTemplatesByUserId(long UserId);
        EmailTemplate GetEmailTemplateById(long Id);
        EmailTemplate InsertEmailTemplate(EmailTemplate emailTemplate);
        bool UpdateEmailTemplate(EmailTemplate emailTemplate);
        bool DeleteEmailTemplate(long Id);
    }
}
