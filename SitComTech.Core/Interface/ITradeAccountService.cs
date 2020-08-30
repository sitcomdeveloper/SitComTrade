using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    
    public interface ITradeAccountService : IService<TradeAccount>
    {
        List<TradeAccountInfoVM> GetTradeAccountList();
        TradeAccountInfoVM GetTradeAccountById(long Id);
        void CreateTradeAccount(CreateTradeAccountVM entity);
        void UpdateTradeAccount(TradeAccount entity);
        bool DeleteTradeAccountById(long TradeAccountId);
        void AddDeposit(FinancialTransactionVM entity);
    }
}
