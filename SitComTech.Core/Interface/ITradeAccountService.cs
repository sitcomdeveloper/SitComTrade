using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using SitComTech.Model.Masters;
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
        List<DocumentType> GetDocumentTypes();
        void AddFinancialTransaction(FinancialTransaction entity);
        List<FinancialTransaction> GetFinancialTransactionList();
        FinancialTransaction GetFinancialTransactionById(long Id);
        void UpdateFinancialTransaction(FinancialTransaction entity);
        bool DeleteMultipleFinancialTransaction(List<long> groupids);
        bool UploadClientDocuments(ClientDocument clientDocument);
        bool WithdrawalAmount(WithdrawalTransaction entity);
    }
}
