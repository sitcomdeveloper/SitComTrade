using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Core.Interface
{
    public interface IClientService : IService<Client>
    {
        Client InsertClient(ClientDataVM userDataVM);

        List<ClientListVM> GetAllClientsByOwnerId(long ownerid);

        Client GetClientDetailById(long id);

        List<Client> GetTradeAccountByType(TradeAccountVM tradeVM);
        Client GetById(object Id);
        void DeleteClient(Client entity);
        bool DeleteMultipleClients(List<long> clientids);
        void UpdateClient(Client entity);
        void UpdateClientStarred(ClientStarredVM entity);
        ClientListVM GetClientInfoDetailById(long clientid);
    }

    public interface IMarketingInfoService : IService<MarketingInfo>
    {
        MarketingInfo GetMarketingInfoByOwnerId(long ownerid);
        MarketingInfo InsertMarketingInfo(MarketingInfo marketingdata);
    }
    public interface IAdditionalInfoService : IService<AdditionalInfo>
    {
        AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid);
        AdditionalInfo InsertAdditionalInfo(AdditionalInfo marketingdata);
    }

    public interface IEmailService : IService<Email>
    {
        List<Email> GetEmailByOwnerId(long ownerid);
        void CreateEmail(Email email, bool issendemail);
        bool EmailToAllClients(Email email);
        bool EmailToSelectedClients(Email email);
    }
    public interface IShortMessageService : IService<ShortMessage>
    {
        List<ShortMessage> GetShortMessageByOwnerId(long ownerid);
    }

    public interface ICommentService : IService<Comment>
    {
        List<Comment> GetCommentByOwnerId(long ownerid);
        Comment GetById(object Id);
        IQueryable<Comment> GetAll();
        void DeleteComment(Comment entity);
        void InsertComment(Comment comm);
    }

    public interface IAddressService : IService<Address>
    {
        Address GetAddressByOwnerId(long ownerid);
        void UpdateAddress(Address entity);
    }
}
