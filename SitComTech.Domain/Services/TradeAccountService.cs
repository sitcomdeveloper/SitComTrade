using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using SitComTech.Model.Masters;
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
                            TransactionDate = DateTime.Now,
                            CurrencyId = 3,
                            CurrencyName = "EUR",
                            TradingEnvironment = "Real",
                            TransactionTypeId = 1,
                            TransactionTypeName = "Deposit",
                            TransactionApprovalId = 1,
                            TransactionApprovalName = "Approved",
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

        public List<DocumentType> GetDocumentTypes()
        {
            return _repository.GetRepository<DocumentType>().Query().Select().ToList();
        }

        public void AddFinancialTransaction(FinancialTransaction entity)
        {
            try
            {
                if (entity.TPAccountNumber != "")
                {
                    FinancialTransaction ftransaction = new FinancialTransaction
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = entity.OwnerId,
                        ClientId = entity.ClientId,
                        AccountId = entity.AccountId,
                        TPAccountNumber = entity.TPAccountNumber,
                        TransactionDate = DateTime.Now,
                        CurrencyId = entity.CurrencyId,
                        CurrencyName = entity.CurrencyName,
                        DepositAmount = entity.DepositAmount,
                        WithdrawAmount = entity.WithdrawAmount,
                        BalanceAmount = entity.BalanceAmount,
                        ItemId = entity.ItemId,
                        TradingEnvironment = entity.TradingEnvironment,
                        TransactionTypeId = entity.TransactionTypeId,
                        TransactionTypeName = entity.TransactionTypeName,
                        TransactionApprovalId = entity.TransactionApprovalId,
                        TransactionApprovalName = entity.TransactionApprovalName,
                        FTD = entity.FTD,
                        Desk = entity.Desk,
                        Comment = entity.Comment,
                        ManualAuto = entity.ManualAuto,
                    };
                    _repository.GetRepository<FinancialTransaction>().Insert(ftransaction);
                    _unitOfWork.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateFinancialTransaction(FinancialTransaction entity)
        {
            FinancialTransaction _financialt = _repository.GetRepository<FinancialTransaction>().Queryable().Where(x => x.Id == entity.Id).FirstOrDefault();
            if (_financialt != null)
            {
                _financialt.OwnerId = entity.OwnerId;
                _financialt.ClientId = entity.ClientId;
                _financialt.AccountId = entity.AccountId;
                _financialt.TPAccountNumber = entity.TPAccountNumber;
                _financialt.TransactionDate = DateTime.Now;
                _financialt.CurrencyId = entity.CurrencyId;
                _financialt.CurrencyName = entity.CurrencyName;
                _financialt.DepositAmount = entity.DepositAmount;
                _financialt.WithdrawAmount = entity.WithdrawAmount;
                _financialt.BalanceAmount = entity.BalanceAmount;
                _financialt.ItemId = entity.ItemId;
                _financialt.TradingEnvironment = entity.TradingEnvironment;
                _financialt.TransactionTypeId = entity.TransactionTypeId;
                _financialt.TransactionTypeName = entity.TransactionTypeName;
                _financialt.TransactionApprovalId = entity.TransactionApprovalId;
                _financialt.TransactionApprovalName = entity.TransactionApprovalName;
                _financialt.FTD = entity.FTD;
                _financialt.Desk = entity.Desk;
                _financialt.Comment = entity.Comment;
                _financialt.ManualAuto = entity.ManualAuto;
                _financialt.UpdatedAt = DateTime.Now;
                _repository.GetRepository<FinancialTransaction>().Update(_financialt);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _financialt == null)
                throw new ArgumentNullException("financial transaction");
        }
        public void DeleteFinancialTransaction(FinancialTransaction entity)
        {
            if (entity == null)
                throw new ArgumentNullException("FinancialTransaction");
            _repository.GetRepository<FinancialTransaction>().Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteMultipleFinancialTransaction(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {

                    List<FinancialTransaction> groups = _repository.GetRepository<FinancialTransaction>().Queryable().Where(x => x.Active && !x.Deleted && groupIds.Contains(x.Id)).ToList();
                    foreach (var grp in groups)
                    {
                        DeleteFinancialTransaction(grp);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public FinancialTransaction GetFinancialTransactionById(long Id)
        {
            if ((long)Id == 0)
                return null;
            FinancialTransaction vinstr = _repository.GetRepository<FinancialTransaction>().Queryable().Where(x =>x.Id ==(long)Id && x.Active && !x.Deleted).FirstOrDefault();
            return vinstr;
        }
        public List<FinancialTransaction> GetFinancialTransactionByClientId(long clientId)
        {
            if (clientId == 0)
                return null;
            List<FinancialTransaction> vinstr = _repository.GetRepository<FinancialTransaction>().Queryable().Where(x => x.Active && !x.Deleted && x.ClientId==clientId).ToList();
            return vinstr;
        }

        public List<FinancialTransaction> GetFinancialTransactionByTPAccountNumber(string TPAccountNumber)
        {
            if (String.IsNullOrEmpty(TPAccountNumber))
                return null;
            List<FinancialTransaction> vinstr = _repository.GetRepository<FinancialTransaction>().Queryable().Where(x => x.Active && !x.Deleted && x.TPAccountNumber == TPAccountNumber.Trim()).ToList();
            return vinstr;
        }

        public List<FinancialTransaction> GetFinancialTransactionList()
        {
            return _repository.GetRepository<FinancialTransaction>().Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }
        public bool UploadClientDocuments(ClientDocument clientDocument)
        {
             _repository.GetRepository<ClientDocument>().Insert(clientDocument);
            int i = _unitOfWork.SaveChanges();
            if (i > 0)
                return true;
            else
                return false;
        }

        public bool WithdrawalAmount(WithdrawalTransaction entity)
        {
            try
            {
                if (entity.TPAccountNumber != "")
                {

                    TradeAccount _TradeAccount = base.Queryable().Where(x => x.Active && !x.Deleted && x.TPAccountNumber == entity.TPAccountNumber).FirstOrDefault();
                    if (_TradeAccount != null)
                    {
                        FinancialTransaction ftransaction = new FinancialTransaction();
                        ftransaction.Active = true;
                        ftransaction.Deleted = false;
                        ftransaction.CreatedAt = DateTime.Now;
                        ftransaction.CreatedBy = 0;
                        ftransaction.CreatedByName = "";
                        ftransaction.TPAccountNumber = entity.TPAccountNumber;
                        ftransaction.WithdrawAmount = entity.WithdrawAmount;
                        ftransaction.TransactionTypeName = "Withdrawal";
                        ftransaction.TransactionTypeId = 2;
                        ftransaction.CurrencyId = 3;
                        ftransaction.CurrencyName = "EUR";
                        ftransaction.TradingEnvironment = "Real";
                        ftransaction.TransactionApprovalId = 1;
                        ftransaction.TransactionApprovalName = "Approved";
                        ftransaction.TransactionDate = DateTime.Now;                         



                        //Savig all WithdrawalTransaction
                        ftransaction.WithdrawalTransactions = new List<WithdrawalTransaction>();
                        //Primary Adder Always Added
                        ftransaction.WithdrawalTransactions.Add(new WithdrawalTransaction()
                        {
                            TPAccountNumber = entity.TPAccountNumber,
                            Active = true,
                            Deleted = false,
                            CreatedAt = DateTime.Now,
                            CreatedBy = 0,
                            CreatedByName = "",
                            TransactionDate = DateTime.Now,
                            CurrencyId = entity.CurrencyId,
                            CurrencyName = entity.CurrencyName,
                            BankName = entity.BankName,
                            IBAN = entity.IBAN,
                            ObjectState = Framework.DataContext.ObjectState.Added
                        });
                        _repository.GetRepository<FinancialTransaction>().Insert(ftransaction);
                        int i = _unitOfWork.SaveChanges();
                        if (i > 0)
                            return true;
                        else
                            return false;
                    }
                }
                else
                    return false;
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
