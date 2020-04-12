using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IClientService : IUnitOfWork<Client>
    {
        Client InsertClient(ClientDataVM userDataVM);

        List<Client> GetAllUsersByOwnerId(long ownerid);

        Client GetUserDetailByOwnerId(long ownerid);

        List<UserResponseStatus> GetLeadStatusList();

        List<Client> GetTradeAccountByType(TradeAccountVM tradeVM);

    }
}
