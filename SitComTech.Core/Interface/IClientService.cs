using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IClientService : IUnitOfWork<Client>
    {
        Client InsertClient(ClientDataVM userDataVM);

        List<ClientListVM> GetAllClientsByOwnerId(long ownerid);

        Client GetClientDetailById(long id);

        List<UserResponseStatus> GetLeadStatusList();

        List<Client> GetTradeAccountByType(TradeAccountVM tradeVM);

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
