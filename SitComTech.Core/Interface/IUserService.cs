using SitComTech.Data.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Core.Interface
{
    public interface IUserService:IUnitOfWork<User>
    {
        bool IsAuthenticated(UserVM userVM);
        UserDataVM Insert(UserDataVM userDataVM);

        List<Country> GetCountries();
    }
}
