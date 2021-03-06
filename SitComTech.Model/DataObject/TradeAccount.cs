﻿using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;

namespace SitComTech.Model.DataObject
{    
    public class TradeAccount : BaseEntity
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
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
        public string Tag { get; set; }
        public Nullable<long> StatusId { get; set; }
        public string StatusName { get; set; }
        public Nullable<bool> IsDisabled { get; set; }
        public Nullable<long> LeverageId { get; set; }
        public string LeverageName { get; set; }
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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Password { get; set; }
        public Nullable<long> LeverageId { get; set; }
        public string LeverageName { get; set; }
        public long UserId { get; set; }
        public long ClientId { get; set; }
        public string AccountId { get; set; }
        public string TPAccountNumber { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public Nullable<Decimal> FtdAmount { get; set; }
        public Nullable<DateTime> LastTradeDate { get; set; }
        public Nullable<DateTime> LastDepositDate { get; set; }
        public Nullable<DateTime> LastLoginDate { get; set; }
        public string Tag { get; set; }
        public Nullable<long> StatusId { get; set; }
        public string StatusName { get; set; }
        public Nullable<bool> IsDisabled { get; set; }
        public string OwnerName { get; set; }
        public Nullable<bool> Demo { get; set; }
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
        public bool? IsOnline { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<bool> Deleted { get; set; }
    }
    public class FinancialTransaction : BaseEntity
    {
        public Nullable<long> OwnerId { get; set; }
        public Nullable<long> ClientId { get; set; }
        public string AccountId { get; set; }
        public string TPAccountNumber { get; set; }
        public Nullable<DateTime> TransactionDate { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<Decimal> DepositAmount { get; set; }
        public Nullable<Decimal> WithdrawAmount { get; set; }
        public Nullable<Decimal> BalanceAmount { get; set; }
        public string ItemId { get; set; }
        public string TradingEnvironment { get; set; }
        public string TransactionTypeName { get; set; }
        public Nullable<long> TransactionTypeId { get; set; }
        public string TransactionApprovalName { get; set; }
        public Nullable<long> TransactionApprovalId { get; set; }
        public Nullable<bool> FTD { get; set; }
        public string Comment { get; set; }
        public string Desk { get; set; }
        public string ManualAuto { get; set; }
        public virtual List<WithdrawalTransaction> WithdrawalTransactions { get; set; }
    }
    public class FinancialTransactionVM
    {
        public string TPAccountNumber { get; set; }
        public Nullable<Decimal> DepositAmount { get; set; }
    }
    public class WithdrawalTransaction : BaseEntity
    {
        public long FinancialTransactionId { get; set; }
        public string TPAccountNumber { get; set; }
        public Nullable<DateTime> TransactionDate { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<Decimal> WithdrawAmount { get; set; }
        public string BankName { get; set; }
        public string IBAN { get; set; }      
        public virtual FinancialTransaction FinancialTransactionTable { get; set; }
    }
}
