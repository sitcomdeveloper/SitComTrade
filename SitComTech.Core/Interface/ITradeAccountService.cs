using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    
    public interface ITradeAccountService : IService<TradeAccount>
    {
        List<TradeAccount> GetTradeAccountList();
        TradeAccount GetTradeAccountById(object Id);
        void CreateTradeAccount(CreateTradeAccountVM entity);
        void UpdateTradeAccount(TradeAccount entity);
        bool DeleteTradeAccountById(long TradeAccountId);
    }
}
