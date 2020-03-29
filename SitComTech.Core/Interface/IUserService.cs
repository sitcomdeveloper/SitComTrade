using SitComTech.Data.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.ViewModel;
using SitComTech.Model.OwnerInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IUnitOfWork<User>
    {
        List<User> IsAuthenticated(UserVM userVM);
        UserDataVM Insert(UserDataVM userDataVM);

        List<Country> GetCountries();
        List<Currency> GetCurrencies();
        string GetCountryISDCodeById(int countryid);
    }
}
