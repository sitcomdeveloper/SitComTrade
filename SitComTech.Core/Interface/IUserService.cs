﻿using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IUnitOfWork<User>
    {
        List<User> IsAuthenticated(UserVM userVM);
        UserDataVM Insert(UserDataVM userDataVM);

        List<UserListVM> GetAllUsersByOwnerId(long ownerid);
        List<Country> GetCountries();
        List<Currency> GetCurrencies();
        string GetCountryISDCodeById(int countryid);

        User GetUserDetailByOwnerId(long ownerid);

        List<UserResponseStatus> GetLeadStatusList();

        List<User> GetTradeAccountByType(TradeAccountVM tradeVM);

        User GetUserbyusername(string username);
    }

    public interface IMarketingInfoService : IUnitOfWork<MarketingInfo>
    {
        MarketingInfo GetMarketingInfoByOwnerId(long ownerid);
        MarketingInfo InsertMarketingInfo(MarketingInfo marketingdata);
    }
    public interface IAdditionalInfoService : IUnitOfWork<AdditionalInfo>
    {
        AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid);
        AdditionalInfo InsertAdditionalInfo(AdditionalInfo marketingdata);
    }

    public interface IEmailService : IUnitOfWork<Email>
    {
        Email GetEmailByOwnerId(long ownerid);
    }
    public interface IShortMessageService : IUnitOfWork<ShortMessage>
    {
        ShortMessage GetShortMessageByOwnerId(long ownerid);
    }


}
