using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IService<User>
    {
        List<User> IsAuthenticated(UserVM userVM);
        UserDataVM InsertUser(UserDataVM userDataVM);
        List<Country> GetCountries();
        List<Currency> GetCurrencies();
        string GetCountryISDCodeById(int countryid);

        User GetUserDetailByOwnerId(long ownerid);

        List<UserResponseStatus> GetLeadStatusList();

        List<User> GetTradeAccountByType(TradeAccountVM tradeVM);

        User GetUserbyusername(string username);
        void UpdateUser(User entity);
        void DeleteUser(User entity);
    }

}
