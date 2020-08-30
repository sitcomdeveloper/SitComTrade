using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{
    public class TradeAccountService : Service<TradeAccount>, ITradeAccountService
    {
        private IGenericRepository<TradeAccount> _repository;
        private IExceptionLoggerService _exceptionloggerService;
        private IUnitOfWork _unitOfWork;
        public TradeAccountService(IGenericRepository<TradeAccount> repository, IExceptionLoggerService exceptionlogger, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._exceptionloggerService = exceptionlogger;
        }

        public TradeAccountInfoVM GetTradeAccountById(long tradeaccountid)
        {
            return _repository.Queryable().Join(_repository.GetRepository<Client>().Queryable(), clients => clients.ClientId, owner => owner.Id,
                (clients, owner) => new { clients, Owner = owner })
                .GroupJoin(_repository.GetRepository<TradeGroup>().Queryable(), userowner => userowner.clients.Id, mrktinfo => mrktinfo.Id,
                (userowner, mrktinfo) => new { UserOwner = userowner, MarketInfo = mrktinfo })
                .SelectMany(x => x.MarketInfo.DefaultIfEmpty(), (x, y) => new { x.UserOwner, MarketInfo = y })
            .Where(x => x.UserOwner.clients.Active && !x.UserOwner.clients.Deleted && x.UserOwner.clients.Id == tradeaccountid).Select(x =>
            new TradeAccountInfoVM
            {
                Id = x.UserOwner.clients.Id,
                UserId = x.UserOwner.clients.UserId,
                ClientId = x.UserOwner.clients.ClientId,
                TPAccountNumber = x.UserOwner.clients.TPAccountNumber,
                FtdAmount = x.UserOwner.clients.FtdAmount,
                CurrencyId = x.UserOwner.clients.CurrencyId,
                CurrencyName = x.UserOwner.clients.CurrencyName,
                AccountId = x.UserOwner.clients.AccountId,
                LastDepositDate = x.UserOwner.clients.LastDepositDate,
                LastTradeDate = x.UserOwner.clients.LastTradeDate,
                LastLoginDate = x.UserOwner.Owner.LastLoginDate,
                TotalDeposit = x.UserOwner.clients.TotalDeposit,
                TotalWithdrawal = x.UserOwner.clients.TotalWithdrawal,
                NetDeposit = x.UserOwner.clients.NetDeposit,
                OpenProfit = x.UserOwner.clients.OpenProfit,
                AllowTrade = x.UserOwner.clients.AllowTrade,
                InitialDeposit = x.UserOwner.clients.InitialDeposit,
                StopOut = x.UserOwner.clients.StopOut,
                MarginCall = x.UserOwner.clients.MarginCall,
                Balance = x.UserOwner.clients.Balance,
                MinDeposit = x.UserOwner.clients.MinDeposit,
                OrderCount = x.UserOwner.clients.OrderCount,
                CloseLoss = x.UserOwner.clients.CloseLoss,
                FTD = x.UserOwner.clients.FTD,
                GroupId = x.UserOwner.clients.GroupId,
                GroupName = x.UserOwner.clients.GroupName,
                FTDDate = x.UserOwner.clients.FTDDate,
                RetentionOwner = x.UserOwner.Owner.RetentionOwner,
                ConvertionOwner = x.UserOwner.Owner.ConvertionOwner,
                AssignedDate = x.UserOwner.Owner.AssignedDate,
                FirstRegistrationDate = x.UserOwner.Owner.FirstRegistrationDate,
                ImportId = x.UserOwner.Owner.ImportId,
                RegistrationType = x.UserOwner.Owner.RegistrationType,
                RegistrationTypeId = x.UserOwner.Owner.RegistrationTypeId,
                ISendEmail = x.UserOwner.clients.ISendEmail,
                OpenLoss = x.UserOwner.clients.OpenLoss,
                Commission = x.UserOwner.clients.Commission,
                Equity = x.UserOwner.clients.Equity,
                MarginLevel = x.UserOwner.clients.MarginLevel,
                FreeMargin = x.UserOwner.clients.FreeMargin,
                Credit = x.UserOwner.clients.Credit,
                Volume = x.UserOwner.clients.Volume,
                DepositCount = x.UserOwner.clients.DepositCount,
                Desk = x.UserOwner.Owner.Desk,
                DeskId = x.UserOwner.Owner.DeskId,
                FirstName = x.UserOwner.Owner.FirstName,
                LastName = x.UserOwner.Owner.LastName,
                Email = x.UserOwner.Owner.Email,
                SecondEmail = x.UserOwner.Owner.SecondEmail,
                Password = x.UserOwner.Owner.Password,
                Phone = x.UserOwner.Owner.Phone,
                LeverageId = x.UserOwner.clients.LeverageId,
                LeverageName = x.UserOwner.clients.LeverageName,
                Demo = x.MarketInfo.Demo,
                OwnerName = x.UserOwner.clients.UserName,
                StatusId = x.UserOwner.clients.StatusId,
                StatusName = x.UserOwner.clients.StatusName,
                Tag = x.UserOwner.clients.Tag,
                IsOnline = x.UserOwner.Owner.IsOnline
            }).FirstOrDefault();
        }

        public List<TradeAccountInfoVM> GetTradeAccountList()
        {
            return _repository.Queryable().Join(_repository.GetRepository<Client>().Queryable(), clients => clients.ClientId, owner => owner.Id,
                (clients, owner) => new { clients, Owner = owner })
                .GroupJoin(_repository.GetRepository<TradeGroup>().Queryable(), userowner => userowner.clients.Id, mrktinfo => mrktinfo.Id,
                (userowner, mrktinfo) => new { UserOwner = userowner, MarketInfo = mrktinfo })
                .SelectMany(x => x.MarketInfo.DefaultIfEmpty(), (x, y) => new { x.UserOwner, MarketInfo = y })
            .Where(x => x.UserOwner.clients.Active && !x.UserOwner.clients.Deleted).Select(x =>
            new TradeAccountInfoVM
            {
                Id = x.UserOwner.clients.Id,
                UserId = x.UserOwner.clients.UserId,
                ClientId = x.UserOwner.clients.ClientId,
                TPAccountNumber = x.UserOwner.clients.TPAccountNumber,
                FtdAmount = x.UserOwner.clients.FtdAmount,
                CurrencyId = x.UserOwner.clients.CurrencyId,
                CurrencyName = x.UserOwner.clients.CurrencyName,
                AccountId = x.UserOwner.clients.AccountId,
                LastDepositDate = x.UserOwner.clients.LastDepositDate,
                LastTradeDate = x.UserOwner.clients.LastTradeDate,
                LastLoginDate = x.UserOwner.Owner.LastLoginDate,
                TotalDeposit = x.UserOwner.clients.TotalDeposit,
                TotalWithdrawal = x.UserOwner.clients.TotalWithdrawal,
                NetDeposit = x.UserOwner.clients.NetDeposit,
                OpenProfit = x.UserOwner.clients.OpenProfit,
                AllowTrade = x.UserOwner.clients.AllowTrade,
                InitialDeposit = x.UserOwner.clients.InitialDeposit,
                StopOut = x.UserOwner.clients.StopOut,
                MarginCall = x.UserOwner.clients.MarginCall,
                Balance = x.UserOwner.clients.Balance,
                MinDeposit = x.UserOwner.clients.MinDeposit,
                OrderCount = x.UserOwner.clients.OrderCount,
                CloseLoss = x.UserOwner.clients.CloseLoss,
                FTD = x.UserOwner.clients.FTD,
                GroupId = x.UserOwner.clients.GroupId,
                GroupName = x.UserOwner.clients.GroupName,
                FTDDate = x.UserOwner.clients.FTDDate,
                RetentionOwner = x.UserOwner.Owner.RetentionOwner,
                ConvertionOwner = x.UserOwner.Owner.ConvertionOwner,
                AssignedDate = x.UserOwner.Owner.AssignedDate,
                FirstRegistrationDate = x.UserOwner.Owner.FirstRegistrationDate,
                ImportId = x.UserOwner.Owner.ImportId,
                RegistrationType = x.UserOwner.Owner.RegistrationType,
                RegistrationTypeId = x.UserOwner.Owner.RegistrationTypeId,
                ISendEmail = x.UserOwner.clients.ISendEmail,
                OpenLoss = x.UserOwner.clients.OpenLoss,
                Commission = x.UserOwner.clients.Commission,
                Equity = x.UserOwner.clients.Equity,
                MarginLevel = x.UserOwner.clients.MarginLevel,
                FreeMargin = x.UserOwner.clients.FreeMargin,
                Credit = x.UserOwner.clients.Credit,
                Volume = x.UserOwner.clients.Volume,
                DepositCount = x.UserOwner.clients.DepositCount,
                Desk = x.UserOwner.Owner.Desk,
                DeskId = x.UserOwner.Owner.DeskId,
                FirstName = x.UserOwner.Owner.FirstName,
                LastName = x.UserOwner.Owner.LastName,
                Email = x.UserOwner.Owner.Email,
                SecondEmail = x.UserOwner.Owner.SecondEmail,
                Password = x.UserOwner.Owner.Password,
                Phone = x.UserOwner.Owner.Phone,
                LeverageId = x.UserOwner.clients.LeverageId,
                LeverageName = x.UserOwner.clients.LeverageName,
                Demo = x.MarketInfo.Demo,
                OwnerName = x.UserOwner.clients.UserName,
                StatusId = x.UserOwner.clients.StatusId,
                StatusName = x.UserOwner.clients.StatusName,
                Tag = x.UserOwner.clients.Tag,
                IsOnline = x.UserOwner.Owner.IsOnline
            }).ToList();
        }
        public void CreateTradeAccount(CreateTradeAccountVM entity)
        {
            try
            {
                string strtag = string.Empty;
                var vtradegroup = _unitOfWork.Repository<TradeGroup>().Query(x => x.Active == true && x.Deleted == false && x.Id == entity.GroupId).Select().FirstOrDefault();
                var vclient = _unitOfWork.Repository<Client>().Query(x => x.Active == true && x.Deleted == false && x.Id == entity.ClientId).Select().FirstOrDefault();
                if (vtradegroup != null && vclient != null)
                {
                    var vmarketinginfo = _unitOfWork.Repository<MarketingInfo>().Query(x => x.Active == true && x.Deleted == false && x.OwnerId == entity.ClientId).Select().FirstOrDefault();
                    if (vmarketinginfo != null)
                        strtag = vmarketinginfo.Tag1;
                    TradeAccount TradeAccount = new TradeAccount
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        TPAccountNumber = vclient.ItemId,
                        FTD = vclient.FTD,
                        FTDDate = vclient.FTDDate,
                        FtdAmount = 0,
                        LastTradeDate = DateTime.Now,
                        LastDepositDate = DateTime.Now,
                        GroupId = vtradegroup.Id,
                        GroupName = vtradegroup.Name,
                        ISendEmail = entity.ISendEmail,
                        CurrencyId = vtradegroup.CurrencyId,
                        CurrencyName = vtradegroup.CurrencyName,
                        InitialDeposit = vtradegroup.InitialDeposit,
                        StopOut = vtradegroup.StopOut,
                        MarginCall = vtradegroup.MarginCall,
                        OrderCount = vtradegroup.OrderCount,
                        MinDeposit = vtradegroup.MinDeposit,
                        CloseProfit = 0,
                        CloseLoss = 0,
                        TotalDeposit = 0,
                        TotalWithdrawal = 0,
                        NetDeposit = 0,
                        OpenProfit = 0,
                        OpenLoss = 0,
                        Commission = 0,
                        Equity = 0,
                        Balance = 0,
                        MarginLevel = 0,
                        FreeMargin = 0,
                        Credit = 0,
                        Volume = 0,
                        AllowTrade = vtradegroup.AllowTrade,
                        DepositCount = 1,
                        UserId = UserIdentity.UserId ?? 0,
                        UserName = UserIdentity.UserName,
                        ClientId = entity.ClientId,
                        AccountId = vclient.ItemId,
                        Tag = strtag,
                        IsDisabled = false,
                        StatusId = 0,
                        StatusName = "",
                        LeverageId= vtradegroup.LeverageId,
                        LeverageName = vtradegroup.LeverageName,
                    };
                    vclient.TypeName = "Real";
                    _repository.Insert(TradeAccount);
                    _repository.GetRepository<Client>().Update(vclient);
                    _unitOfWork.SaveChanges();
                    if (entity.ISendEmail == true)
                    {
                        SendEmilToClient(vclient.Email);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SendEmilToClient(string clientdata)
        {
            try
            {

                string content = "<html><body><p>Dear </p>";// + clientdata.FirstName + " " + clientdata.LastName + ",</b></p>";
                content += "<p>We let you know that  with the following details has been created for you in the system :</p>";

                //content += "<p>Email: " + clientdata.Email + "</p>";
                //content += "<p>Password: " + clientdata.Password + "</p>";
                content += "<p>Happy Trading !</p>";
                content += "<p>SitCom Team</p></body></html>";
                MailManager oMailManager = new MailManager
                {
                    To = clientdata,
                    Subject = "Created Successfully - SitCom!",
                    IsBodyHtml = true,
                    Body = content
                };
                oMailManager.SendEmail();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateTradeAccount(TradeAccount entity)
        {
            try
            {
                TradeAccount _tradeaccount = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
                if (_tradeaccount != null)
                {
                    _tradeaccount.UpdatedAt = DateTime.Now;
                    _tradeaccount.TPAccountNumber = entity.TPAccountNumber;
                    _tradeaccount.FTD = entity.FTD;
                    _tradeaccount.FTDDate = entity.FTDDate;
                    _tradeaccount.FtdAmount = entity.FtdAmount;
                    _tradeaccount.LastTradeDate = entity.LastTradeDate;
                    _tradeaccount.LastDepositDate = entity.LastDepositDate;
                    _tradeaccount.GroupId = entity.GroupId;
                    _tradeaccount.GroupName = entity.GroupName;
                    _tradeaccount.ISendEmail = entity.ISendEmail;
                    _tradeaccount.CurrencyId = entity.CurrencyId;
                    _tradeaccount.CurrencyName = entity.CurrencyName;
                    _tradeaccount.InitialDeposit = entity.InitialDeposit;
                    _tradeaccount.StopOut = entity.StopOut;
                    _tradeaccount.MarginCall = entity.MarginCall;
                    _tradeaccount.OrderCount = entity.OrderCount;
                    _tradeaccount.MinDeposit = entity.MinDeposit;
                    _tradeaccount.CloseProfit = entity.CloseProfit;
                    _tradeaccount.CloseLoss = entity.CloseLoss;
                    _tradeaccount.TotalDeposit = entity.TotalDeposit;
                    _tradeaccount.TotalWithdrawal = entity.TotalWithdrawal;
                    _tradeaccount.NetDeposit = entity.NetDeposit;
                    _tradeaccount.OpenProfit = entity.OpenProfit;
                    _tradeaccount.OpenLoss = entity.OpenLoss;
                    _tradeaccount.Commission = entity.Commission;
                    _tradeaccount.Equity = entity.Equity;
                    _tradeaccount.Balance = entity.Balance;
                    _tradeaccount.MarginLevel = entity.MarginLevel;
                    _tradeaccount.FreeMargin = entity.FreeMargin;
                    _tradeaccount.Credit = entity.Credit;
                    _tradeaccount.Volume = entity.Volume;
                    _tradeaccount.AllowTrade = entity.AllowTrade;
                    _tradeaccount.DepositCount = entity.DepositCount;
                    _tradeaccount.UserId = entity.UserId;
                    _tradeaccount.UserName = entity.UserName;
                    _tradeaccount.Tag = entity.Tag;
                    _tradeaccount.StatusId = entity.StatusId;
                    _tradeaccount.StatusName = entity.StatusName;
                    _tradeaccount.IsDisabled = entity.IsDisabled;
                    _tradeaccount.ClientId = entity.ClientId;
                    _tradeaccount.AccountId = entity.AccountId;
                    _tradeaccount.LeverageId = entity.LeverageId;
                    _tradeaccount.LeverageName = entity.LeverageName;
                    _repository.Update(_tradeaccount);
                    _unitOfWork.SaveChanges();
                }
                if (entity == null || _tradeaccount == null)
                    throw new ArgumentNullException("TradeAccount");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeleteTradeAccount(TradeAccount entity)
        {
            if (entity == null)
                throw new ArgumentNullException("TradeAccount");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteTradeAccountById(long TradeAccountId)
        {
            try
            {
                if (TradeAccountId != 0)
                {

                    TradeAccount _TradeAccount = base.Queryable().Where(x => x.Active && !x.Deleted && x.Id == TradeAccountId).FirstOrDefault();
                    if (_TradeAccount != null)
                    {
                        _TradeAccount.Deleted = true;
                        _repository.Update(_TradeAccount);
                        _unitOfWork.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                _exceptionloggerService.InsertExceptionLogger(ex.StackTrace, "TradeAccount");
                return false;
            }
        }

        public void AddDeposit(FinancialTransactionVM entity)
        {
            try
            {
                if (entity.TPAccountNumber != "")
                {

                    TradeAccount _TradeAccount = base.Queryable().Where(x => x.Active && !x.Deleted && x.TPAccountNumber == entity.TPAccountNumber).FirstOrDefault();
                    if (_TradeAccount != null)
                    {
                        FinancialTransaction ftransaction = new FinancialTransaction
                        {
                            Active = true,
                            Deleted = false,
                            CreatedAt = DateTime.Now,
                            CreatedBy = 0,
                            CreatedByName = "",
                            TPAccountNumber = entity.TPAccountNumber,
                            DepositAmount=entity.DepositAmount,
                        };
                        _repository.GetRepository<FinancialTransaction>().Insert(ftransaction);
                        _unitOfWork.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }            
        }
    }
}
