using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IUnitOfWork<User>
    {
        User IsAuthenticated(UserVM userVM);
        UserDataVM Insert(UserDataVM userDataVM);
        List<Country> GetCountries();
        List<Currency> GetCurrencies();
        string GetCountryISDCodeById(int countryid);

        User GetUserDetailByOwnerId(long ownerid);

        List<UserResponseStatus> GetLeadStatusList();

        List<User> GetTradeAccountByType(TradeAccountVM tradeVM);

        User GetUserbyusername(string username);
    }

}
