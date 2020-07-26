using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{    
    public class TradeAccount : BaseEntity
    {
        public long UserId { get; set; }
        public long ClientId { get; set; }
        public string AccountId { get; set; }
        public string TPAccountNumber { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public Nullable<Decimal> FtdAmount { get; set; }
        public Nullable<DateTime> LastTradeDate { get; set; }
        public Nullable<DateTime> LastDepositDate { get; set; }
        public string GroupName { get; set; }
        public Nullable<long> GroupId { get; set; }        
        public Nullable<bool> ISendEmail { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<Decimal> InitialDeposit { get; set; }
        public string StopOut { get; set; }
        public string MarginCall { get; set; }
        public Nullable<long> OrderCount { get; set; }
        public Nullable<Decimal> MinDeposit { get; set; }
        public Nullable<Decimal> CloseProfit { get; set; }
        public Nullable<Decimal> CloseLoss { get; set; }
        public Nullable<Decimal> TotalDeposit { get; set; }
        public Nullable<Decimal> TotalWithdrawal { get; set; }
        public Nullable<Decimal> NetDeposit { get; set; }
        public Nullable<Decimal> OpenProfit { get; set; }
        public Nullable<Decimal> OpenLoss { get; set; }
        public Nullable<Decimal> Commission { get; set; }
        public Nullable<Decimal> Equity { get; set; }
        public Nullable<Decimal> Balance { get; set; }
        public Nullable<Decimal> MarginLevel { get; set; }
        public Nullable<Decimal> FreeMargin { get; set; }
        public Nullable<Decimal> Credit { get; set; }
        public Nullable<Decimal> Volume { get; set; }
        public Nullable<bool> AllowTrade { get; set; }
        public Nullable<long> DepositCount { get; set; }
        public virtual User UserTable { get; set; }
    }
    public class TradeAccountVM
    {
        public string TypeName { get; set; }
        public long OwnerId { get; set; }
    }
    public class CreateTradeAccountVM
    {
        public long ClientId { get; set; }
        public long GroupId { get; set; }
        public bool ISendEmail { get; set; }
    }
    public class TradeAccountInfoVM
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long ClientId { get; set; }
        public string AccountId { get; set; }
        public string TPAccountNumber { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public Nullable<Decimal> FtdAmount { get; set; }
        public Nullable<DateTime> LastTradeDate { get; set; }
        public Nullable<DateTime> LastDepositDate { get; set; }
        public string GroupName { get; set; }
        public Nullable<long> GroupId { get; set; }
        public Nullable<bool> ISendEmail { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<Decimal> InitialDeposit { get; set; }
        public string StopOut { get; set; }
        public string MarginCall { get; set; }
        public Nullable<long> OrderCount { get; set; }
        public Nullable<Decimal> MinDeposit { get; set; }
        public Nullable<Decimal> CloseProfit { get; set; }
        public Nullable<Decimal> CloseLoss { get; set; }
        public Nullable<Decimal> TotalDeposit { get; set; }
        public Nullable<Decimal> TotalWithdrawal { get; set; }
        public Nullable<Decimal> NetDeposit { get; set; }
        public Nullable<Decimal> OpenProfit { get; set; }
        public Nullable<Decimal> OpenLoss { get; set; }
        public Nullable<Decimal> Commission { get; set; }
        public Nullable<Decimal> Equity { get; set; }
        public Nullable<Decimal> Balance { get; set; }
        public Nullable<Decimal> MarginLevel { get; set; }
        public Nullable<Decimal> FreeMargin { get; set; }
        public Nullable<Decimal> Credit { get; set; }
        public Nullable<Decimal> Volume { get; set; }
        public Nullable<bool> AllowTrade { get; set; }
        public Nullable<long> DepositCount { get; set; }

        public Nullable<long> RetentionOwner { get; set; }
        public Nullable<long> ConvertionOwner { get; set; }
        public string TypeName { get; set; }
        public Nullable<DateTime> AssignedDate { get; set; }
        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public string ImportId { get; set; }
        public string Desk { get; set; }
        public Nullable<long> DeskId { get; set; }
        public string RegistrationType { get; set; }
        public Nullable<long> RegistrationTypeId { get; set; }

    }
}
