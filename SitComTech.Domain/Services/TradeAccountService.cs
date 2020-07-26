using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
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

        public TradeAccount GetTradeAccountById(object Id)
        {
            if ((long)Id == 0)
                return null;
            TradeAccount vinstr = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id && x.Active && !x.Deleted);
            return vinstr;
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
                TPAccountNumber = x.UserOwner.clients.TPAccountNumber,
                FtdAmount = x.UserOwner.clients.FtdAmount,
                CurrencyId = x.UserOwner.clients.CurrencyId,
                CurrencyName = x.UserOwner.clients.CurrencyName,
                AccountId = x.UserOwner.clients.AccountId,
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
                ISendEmail = x.UserOwner.clients.ISendEmail
            }).FirstOrDefault();
        }

        public List<TradeAccount> GetTradeAccountList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public void CreateTradeAccount(CreateTradeAccountVM entity)
        {
            try
            {
                var vtradegroup = _unitOfWork.Repository<TradeGroup>().Query(x => x.Active == true && x.Deleted == false && x.Id == entity.GroupId).Select().FirstOrDefault();
                var vclient = _unitOfWork.Repository<Client>().Query(x => x.Active == true && x.Deleted == false && x.Id == entity.ClientId).Select().FirstOrDefault();
                if (vtradegroup != null && vclient != null)
                {
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
                        ClientId = entity.ClientId,
                        AccountId = vclient.ItemId,
                    };
                    _repository.Insert(TradeAccount);
                    _unitOfWork.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateTradeAccount(TradeAccount entity)
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
                _tradeaccount.ClientId = entity.ClientId;
                _tradeaccount.AccountId = entity.AccountId;
                _repository.Update(_tradeaccount);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _tradeaccount == null)
                throw new ArgumentNullException("TradeAccount");
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
                        DeleteTradeAccount(_TradeAccount);
                }
                return true;
            }
            catch (Exception ex)
            {
                _exceptionloggerService.InsertExceptionLogger(ex.StackTrace, "TradeAccount");
                return false;
            }
        }
    }
}
