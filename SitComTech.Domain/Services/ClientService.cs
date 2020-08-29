using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace SitComTech.Domain.Services
{
    public class ClientService : Service<Client>, IClientService
    {
        private IGenericRepository<Client> _repository;
        private IGenericRepository<MarketingInfo> _marketinginforepository;
        private IUnitOfWork _unitOfWork;
        public ClientService(IGenericRepository<Client> repository, IGenericRepository<MarketingInfo> marketinginforepository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._marketinginforepository = marketinginforepository;
        }
        public IQueryable<Client> GetAll()
        {
            return base.Queryable().Where(x => x.Active && !x.Deleted);
        }

        public Client GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            Client Client = base.Queryable().FirstOrDefault(x => x.Active && !x.Deleted && x.Id == (long)Id);
            return Client;
        }

        public Client InsertClient(ClientDataVM clientdata)
        {
            try
            {
                var Clientexist = base.Queryable().Where(x => x.Email == clientdata.Email).FirstOrDefault();
                if (Clientexist == null)
                {
                    if (clientdata == null)
                        throw new ArgumentNullException("Client");
                    Client entity = new Client
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        FirstName = clientdata.FirstName,
                        LastName = clientdata.LastName,
                        Password = clientdata.Password,
                        Email = clientdata.Email,
                        GroupId = clientdata.GroupId,
                        GroupName = clientdata.GroupName,
                        CountryId = clientdata.CountryId,
                        CountryName = clientdata.CountryName,
                        Enabled = true,
                        TypeName = clientdata.AccountType,
                        FirstRegistrationDate = DateTime.Now,
                        RegistrationType = "Direct",
                        ISendEmail = clientdata.ISendEmail,
                        Phone = clientdata.Phone,
                        ResponseStatusId = 7,
                        ResponseStatus = "Interested",
                        OwnerId = clientdata.OwnerId,
                        CountryISDCode = clientdata.CountryISDCode,
                        ConvertionDeskId = clientdata.ConvertionDeskId,
                        ConvertionDeskName = clientdata.ConvertionDeskName,
                        RealAccountTypeId = clientdata.RealAccountTypeId,
                        RealAccountTypeName = clientdata.RealAccountTypeName,
                        TradeAccountType = clientdata.TradeAccountType,
                        PreferredLanguage = clientdata.PreferredLanguage,
                    };
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    if (clientdata.ISendEmail == true)
                    {
                        SendEmilToClient(clientdata);
                    }
                    return entity;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SendEmilToClient(ClientDataVM clientdata)
        {
            try
            {

                string content = "<html><body><p>Dear <b>" + clientdata.FirstName + " " + clientdata.LastName + ",</b></p>";
                content += "<p>We let you know that  with the following details has been created for you in the system :</p>";

                content += "<p>Email: " + clientdata.Email + "</p>";
                content += "<p>Password: " + clientdata.Password + "</p>";
                content += "<p>Happy Trading !</p>";
                content += "<p>SitCom Team</p></body></html>";
                MailManager oMailManager = new MailManager
                {
                    To = clientdata.Email,
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

        public void UpdateClient(Client entity)
        {
            Client clientdata = base.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (clientdata != null)
            {
                clientdata.UpdatedAt = DateTime.Now;
                clientdata.UpdatedBy = entity.Id;
                clientdata.UpdatedByName = entity.FirstName;
                clientdata.FirstName = entity.FirstName;
                clientdata.LastName = entity.LastName;
                clientdata.Password = entity.Password;
                clientdata.Email = entity.Email;
                clientdata.GroupId = entity.GroupId;
                clientdata.GroupName = entity.GroupName;
                clientdata.CountryId = entity.CountryId;
                clientdata.CountryName = entity.CountryName;
                clientdata.TypeName = entity.TypeName;
                clientdata.Phone = entity.Phone;
                clientdata.OwnerId = entity.OwnerId;
                clientdata.ResponseStatus = entity.ResponseStatus;
                clientdata.ResponseStatusId = entity.ResponseStatusId;
                clientdata.ItemId = entity.ItemId;
                clientdata.FTDDate = entity.FTDDate;
                clientdata.Enabled = entity.Enabled;
                clientdata.ConvertionOwner = entity.ConvertionOwner;
                clientdata.DateOfBirth = entity.DateOfBirth;
                clientdata.DaysAgoClientCreated = entity.DaysAgoClientCreated;
                clientdata.FirstRegistrationDate = entity.FirstRegistrationDate;
                clientdata.FTD = entity.FTD;
                clientdata.Mobile = entity.Mobile;
                clientdata.RegistrationType = entity.RegistrationType;
                clientdata.RegistrationTypeId = entity.RegistrationTypeId;
                clientdata.RetentionOwner = entity.RetentionOwner;
                clientdata.SecondEmail = entity.SecondEmail;
                clientdata.LastTaskDaysPast = entity.LastTaskDaysPast;
                clientdata.Desk = entity.Desk;
                clientdata.DeskId = entity.DeskId;
                clientdata.CitizenshipId = entity.CitizenshipId;
                clientdata.AssignedDate = entity.AssignedDate;
                clientdata.CountryISDCode = entity.CountryISDCode;
                clientdata.ConvertionDeskId = entity.ConvertionDeskId;
                clientdata.ConvertionDeskName = entity.ConvertionDeskName;
                clientdata.RealAccountTypeId = entity.RealAccountTypeId;
                clientdata.RealAccountTypeName = entity.RealAccountTypeName;
                clientdata.TradeAccountType = entity.TradeAccountType;
                clientdata.PreferredLanguage = entity.PreferredLanguage;
                _repository.Update(clientdata);
                _unitOfWork.SaveChanges();
            }
        }

        public void DeleteClient(Client entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            entity.Deleted = true;
            _repository.Update(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteMultipleClients(List<long> clientIds)
        {
            try
            {
                if (clientIds != null && clientIds.Count > 0)
                {

                    List<Client> Clients = base.Queryable().Where(x => x.Active && !x.Deleted && clientIds.Contains(x.Id)).ToList();
                    foreach (var client in Clients)
                    {
                        DeleteClient(client);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public Client GetClientDetailById(long Id)
        {
            if ((long)Id == 0)
                return null;
            Client Client = _repository.Queryable().FirstOrDefault(x => x.Id == Id && x.Active && !x.Deleted);
            return Client;
        }

        public List<TradeAccountInfoVM> GetTradeAccountByType(TradeAccountVM tradeVM)
        {
            var Clientexist = _repository.Queryable().Join(_repository.GetRepository<TradeAccount>().Queryable(), clients => clients.Id, tradeacc => tradeacc.ClientId,
            (clients, tradeacc) => 
            new TradeAccountInfoVM
            {
                Id = tradeacc.Id,
                UserId = tradeacc.UserId,
                ClientId = tradeacc.ClientId,
                TPAccountNumber = tradeacc.TPAccountNumber,
                FtdAmount = tradeacc.FtdAmount,
                CurrencyId = tradeacc.CurrencyId,
                CurrencyName = tradeacc.CurrencyName,
                AccountId = tradeacc.AccountId,
                LastDepositDate = tradeacc.LastDepositDate,
                LastTradeDate = tradeacc.LastTradeDate,
                LastLoginDate = clients.LastLoginDate,
                TotalDeposit = tradeacc.TotalDeposit,
                TotalWithdrawal = tradeacc.TotalWithdrawal,
                NetDeposit = tradeacc.NetDeposit,
                OpenProfit = tradeacc.OpenProfit,
                AllowTrade = tradeacc.AllowTrade,
                InitialDeposit = tradeacc.InitialDeposit,
                StopOut = tradeacc.StopOut,
                MarginCall = tradeacc.MarginCall,
                Balance = tradeacc.Balance,
                MinDeposit = tradeacc.MinDeposit,
                OrderCount = tradeacc.OrderCount,
                CloseLoss = tradeacc.CloseLoss,
                FTD = tradeacc.FTD,
                GroupId = tradeacc.GroupId,
                GroupName = tradeacc.GroupName,
                FTDDate = tradeacc.FTDDate,
                RetentionOwner = clients.RetentionOwner,
                ConvertionOwner = clients.ConvertionOwner,
                AssignedDate = clients.AssignedDate,
                FirstRegistrationDate = clients.FirstRegistrationDate,
                ImportId = clients.ImportId,
                RegistrationType = clients.RegistrationType,
                RegistrationTypeId = clients.RegistrationTypeId,
                ISendEmail = tradeacc.ISendEmail,
                OpenLoss = tradeacc.OpenLoss,
                Commission = tradeacc.Commission,
                Equity = tradeacc.Equity,
                MarginLevel = tradeacc.MarginLevel,
                FreeMargin = tradeacc.FreeMargin,
                Credit = tradeacc.Credit,
                Volume = tradeacc.Volume,
                DepositCount = tradeacc.DepositCount,
                Desk = clients.Desk,
                DeskId = clients.DeskId,
                FirstName = clients.FirstName,
                LastName = clients.LastName,
                Email = clients.Email,
                SecondEmail = clients.SecondEmail,
                Password = clients.Password,
                Phone = clients.Phone,
                LeverageId = tradeacc.LeverageId,
                LeverageName = tradeacc.LeverageName,
                OwnerName = tradeacc.UserName,
                StatusId = tradeacc.StatusId,
                StatusName = tradeacc.StatusName,
                Tag = tradeacc.Tag,
                IsOnline = clients.IsOnline,
                Active= clients.Active,
                Deleted=clients.Deleted,
                TypeName = clients.TypeName
            }).ToList();
            Clientexist = Clientexist.Where(x => (x.TypeName == tradeVM.TypeName) && x.UserId == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
            return Clientexist;
        }

        public List<Client> GetAllUsersByOwnerId(long ownerid)
        {
            throw new NotImplementedException();
        }

        public Client GetUserDetailByOwnerId(long ownerid)
        {
            throw new NotImplementedException();
        }

        public List<ClientListVM> GetAllClientsByOwnerId(long ownerid)
        {
            return _repository.Queryable().Join(_repository.GetRepository<User>().Queryable(), clients => clients.OwnerId, owner => owner.Id,
                (clients, owner) => new { clients, Owner = owner })
                .GroupJoin(_marketinginforepository.Queryable(), userowner => userowner.clients.Id, mrktinfo => mrktinfo.OwnerId,
                (userowner, mrktinfo) => new { UserOwner = userowner, MarketInfo = mrktinfo })
                .SelectMany(x => x.MarketInfo.DefaultIfEmpty(), (x, y) => new { x.UserOwner, MarketInfo = y })
            .Where(x => x.UserOwner.clients.Active && !x.UserOwner.clients.Deleted && x.UserOwner.clients.OwnerId == ownerid).Select(x =>
            new ClientListVM
            {
                Id = x.UserOwner.clients.Id,
                ItemId = x.UserOwner.clients.ItemId,
                FirstName = x.UserOwner.clients.FirstName,
                LastName = x.UserOwner.clients.LastName,
                CountryName = x.UserOwner.clients.CountryName,
                CountryId = x.UserOwner.clients.CountryId,
                FirstOwner = x.UserOwner.clients.FirstOwner,
                PreviousOwner = x.UserOwner.clients.PreviousOwner,
                LastCallDate = x.UserOwner.clients.LastCallDate,
                Password = x.UserOwner.clients.Password,
                Email = x.UserOwner.clients.Email,
                TypeName = x.UserOwner.clients.TypeName,
                TypeId = x.UserOwner.clients.TypeId,
                Phone = x.UserOwner.clients.Phone,
                OwnerName = x.UserOwner.Owner.FirstName + " " + x.UserOwner.Owner.LastName,
                ResponseStatus = x.UserOwner.clients.ResponseStatus,
                ResponseStatusId = x.UserOwner.clients.ResponseStatusId,
                CreatedDate = x.UserOwner.clients.CreatedAt,
                CampaignId = x.MarketInfo.CampaignID,
                Tag = x.MarketInfo.Tag1,
                Tag1 = x.MarketInfo.Tag2,
                FTD = x.UserOwner.clients.FTD,
                GroupId = x.UserOwner.clients.GroupId,
                GroupName = x.UserOwner.clients.GroupName,
                Desk = x.UserOwner.clients.Desk,
                DeskId = x.UserOwner.clients.DeskId,
                OwnerId = x.UserOwner.clients.OwnerId,
                Mobile = x.UserOwner.clients.Mobile,
                SecondEmail = x.UserOwner.clients.SecondEmail,
                FTDDate = x.UserOwner.clients.FTDDate,
                Enabled = x.UserOwner.clients.Enabled,
                RetentionOwner = x.UserOwner.clients.RetentionOwner,
                ConvertionOwner = x.UserOwner.clients.ConvertionOwner,
                AssignedDate = x.UserOwner.clients.AssignedDate,
                FirstRegistrationDate = x.UserOwner.clients.FirstRegistrationDate,
                ImportId = x.UserOwner.clients.ImportId,
                RegistrationType = x.UserOwner.clients.RegistrationType,
                RegistrationTypeId = x.UserOwner.clients.RegistrationTypeId,
                LastTaskDaysPast = x.UserOwner.clients.LastTaskDaysPast,
                DaysAgoClientCreated = x.UserOwner.clients.DaysAgoClientCreated,
                ISendEmail = x.UserOwner.clients.ISendEmail,
                CitizenshipId = x.UserOwner.clients.CitizenshipId,
                IsStarred = x.UserOwner.clients.IsStarred,
                CountryISDCode = x.UserOwner.clients.CountryISDCode,
                ConvertionDeskId = x.UserOwner.clients.ConvertionDeskId,
                ConvertionDeskName = x.UserOwner.clients.ConvertionDeskName,
                RealAccountTypeId = x.UserOwner.clients.RealAccountTypeId,
                RealAccountTypeName = x.UserOwner.clients.RealAccountTypeName,
                TradeAccountType = x.UserOwner.clients.TradeAccountType,
                PreferredLanguage = x.UserOwner.clients.PreferredLanguage
            }).ToList();
        }

        public void UpdateClientStarred(ClientStarredVM entity)
        {
            Client clientdata = base.Queryable().FirstOrDefault(x => x.Id == entity.ClientId && x.Active == true && x.Deleted == false);
            if (clientdata != null)
            {
                clientdata.UpdatedAt = DateTime.Now;
                clientdata.IsStarred = entity.IsStarred;
                _repository.Update(clientdata);
                _unitOfWork.SaveChanges();
            }
        }
        public ClientListVM GetClientInfoDetailById(long clientid)
        {
            return _repository.Queryable().Join(_repository.GetRepository<User>().Queryable(), clients => clients.OwnerId, owner => owner.Id,
                (clients, owner) => new { clients, Owner = owner })
                .GroupJoin(_marketinginforepository.Queryable(), userowner => userowner.clients.Id, mrktinfo => mrktinfo.OwnerId,
                (userowner, mrktinfo) => new { UserOwner = userowner, MarketInfo = mrktinfo })
                .SelectMany(x => x.MarketInfo.DefaultIfEmpty(), (x, y) => new { x.UserOwner, MarketInfo = y })
            .Where(x => x.UserOwner.clients.Active && !x.UserOwner.clients.Deleted && x.UserOwner.clients.Id == clientid).Select(x =>
            new ClientListVM
            {
                Id = x.UserOwner.clients.Id,
                ItemId = x.UserOwner.clients.ItemId,
                FirstName = x.UserOwner.clients.FirstName,
                LastName = x.UserOwner.clients.LastName,
                CountryName = x.UserOwner.clients.CountryName,
                CountryId = x.UserOwner.clients.CountryId,
                FirstOwner = x.UserOwner.clients.FirstOwner,
                PreviousOwner = x.UserOwner.clients.PreviousOwner,
                LastCallDate = x.UserOwner.clients.LastCallDate,
                Password = x.UserOwner.clients.Password,
                Email = x.UserOwner.clients.Email,
                TypeName = x.UserOwner.clients.TypeName,
                TypeId = x.UserOwner.clients.TypeId,
                Phone = x.UserOwner.clients.Phone,
                OwnerName = x.UserOwner.Owner.FirstName + " " + x.UserOwner.Owner.LastName,
                ResponseStatus = x.UserOwner.clients.ResponseStatus,
                ResponseStatusId = x.UserOwner.clients.ResponseStatusId,
                CreatedDate = x.UserOwner.clients.CreatedAt,
                CampaignId = x.MarketInfo.CampaignID,
                Tag = x.MarketInfo.Tag1,
                Tag1 = x.MarketInfo.Tag2,
                FTD = x.UserOwner.clients.FTD,
                GroupId = x.UserOwner.clients.GroupId,
                GroupName = x.UserOwner.clients.GroupName,
                Desk = x.UserOwner.clients.Desk,
                DeskId = x.UserOwner.clients.DeskId,
                OwnerId = x.UserOwner.clients.OwnerId,
                Mobile = x.UserOwner.clients.Mobile,
                SecondEmail = x.UserOwner.clients.SecondEmail,
                FTDDate = x.UserOwner.clients.FTDDate,
                Enabled = x.UserOwner.clients.Enabled,
                RetentionOwner = x.UserOwner.clients.RetentionOwner,
                ConvertionOwner = x.UserOwner.clients.ConvertionOwner,
                AssignedDate = x.UserOwner.clients.AssignedDate,
                FirstRegistrationDate = x.UserOwner.clients.FirstRegistrationDate,
                ImportId = x.UserOwner.clients.ImportId,
                RegistrationType = x.UserOwner.clients.RegistrationType,
                RegistrationTypeId = x.UserOwner.clients.RegistrationTypeId,
                LastTaskDaysPast = x.UserOwner.clients.LastTaskDaysPast,
                DaysAgoClientCreated = x.UserOwner.clients.DaysAgoClientCreated,
                ISendEmail = x.UserOwner.clients.ISendEmail,
                CitizenshipId = x.UserOwner.clients.CitizenshipId,
                IsStarred = x.UserOwner.clients.IsStarred,
                CountryISDCode = x.UserOwner.clients.CountryISDCode,
                ConvertionDeskId = x.UserOwner.clients.ConvertionDeskId,
                ConvertionDeskName = x.UserOwner.clients.ConvertionDeskName,
                RealAccountTypeId = x.UserOwner.clients.RealAccountTypeId,
                RealAccountTypeName = x.UserOwner.clients.RealAccountTypeName,
                TradeAccountType = x.UserOwner.clients.TradeAccountType,
                PreferredLanguage = x.UserOwner.clients.PreferredLanguage
            }).FirstOrDefault();
        }

        public void ImportClient(List<ImportClient> clients)
        {
            _repository.GetRepository<ImportClient>().InsertRange(clients);
            _unitOfWork.SaveChanges();
            foreach (var client in clients)
            {
                var emails = new List<string> { client.Email, client.SecondEmail };
                var isExist = _repository.Query(x => emails.Contains(x.Email)).Select().Any();
                if (!isExist)
                {
                    Country country = _repository.GetRepository<Country>().Queryable().Where(x => x.Name.ToUpper() == client.Country.ToUpper()).FirstOrDefault();
                    Client entity = new Client
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        FirstName = client.FirstName,
                        LastName = client.LastName,
                        Email = client.Email,
                        CountryId = country?.Id ?? 0,
                        CountryName = country?.Name ?? "",
                        Enabled = true,
                        TypeName = "Lead",
                        FirstRegistrationDate = client.FirstRegistrationDate,
                        RegistrationType = "Direct",
                        ISendEmail = false,
                        Phone = client.Phone,
                        ResponseStatusId = 13,
                        ResponseStatus = "New",
                        OwnerId = (long)client.OwnerId,
                        CountryISDCode = country?.ISDCode ?? "",
                    };
                    _repository.Insert(entity);
                    entity.ObjectState = Framework.DataContext.ObjectState.Added;
                    _unitOfWork.SaveChanges();
                    AffiliateUser affiliateUser = _repository.GetRepository<AffiliateUser>().Queryable().Where(x => x.Id == (long)client.AffiliateUser).FirstOrDefault();
                    MarketingInfo marketingInfo = new MarketingInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = (long)entity.Id,
                        AffiliateID = client.AffiliateID,
                        AffiliateUser = affiliateUser.Name,
                        AffiliateUserId = affiliateUser.Id,
                        AffTransactionID = client.AffTransactionID,
                        CampaignID = client.CampaignID,
                        IPAddress = client.IPAddress,
                        IPCountry = client.IPCountry,
                        Referrer = client.Referrer,
                        Source = client.Source,
                        SubAffiliateID = client.SubAffiliateID,
                        Tag1 = client.Tag,
                        Tag2 = client.Tag1,
                        UtmCampaign = client.UtmCampaign,
                        UtmContent = client.UtmContent,
                        UtmCreative = client.UtmCreative,
                        UtmMedium = client.UtmMedium,
                        UtmSource = client.UtmSource,
                        GoogleKeyword = client.GoogleKeyword,
                    };
                    _repository.GetRepository<MarketingInfo>().Insert(marketingInfo);
                    _unitOfWork.SaveChanges();
                    Address addr = new Address
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = (long)entity.Id,
                        CountryId = country?.Id ?? 0,
                        CountryName = country?.Name ?? "",
                        ZipCode = client.ZipCode,
                        City = client.City,
                        State = client.State,
                        StreetAddress = client.Address,
                    };
                    _repository.GetRepository<Address>().Insert(addr);
                    _unitOfWork.SaveChanges();
                }
            }
        }

        public ClientAddressVM GetTradeAccountDetailWithAddressById(string emailaddress)
        {
            return _repository.Queryable().Join(_repository.GetRepository<Address>().Queryable(), clients => clients.Id, addr => addr.OwnerId,
                (clients, addr) => new { clients, Addrs = addr }) 
            .Where(x => x.clients.Active && !x.clients.Deleted && x.clients.Email == emailaddress).Select(x =>
            new ClientAddressVM
            {
                Id = x.clients.Id,
                OwnerId = x.clients.OwnerId,
                CountryId = x.clients.CountryId,
                CountryName = x.clients.CountryName,               
                FirstName = x.clients.FirstName,
                LastName = x.clients.LastName,
                Email = x.clients.Email,
                PinCode = x.Addrs.ZipCode,
                State = x.Addrs.State,
                City = x.Addrs.City,               
            }).FirstOrDefault();
        }
        public void UpdateClientWithAddress(ClientAddressVM entity)
        {
            Client clientdata = base.Queryable().FirstOrDefault(x => x.Email == entity.Email);
            if (clientdata != null)
            {
                clientdata.UpdatedAt = DateTime.Now;
                clientdata.UpdatedBy = entity.Id;
                clientdata.UpdatedByName = entity.FirstName;
                clientdata.FirstName = entity.FirstName;
                clientdata.LastName = entity.LastName;
                clientdata.Password = entity.Password;
                clientdata.Email = entity.Email;                
                clientdata.CountryId = entity.CountryId;
                clientdata.CountryName = entity.CountryName;               
                clientdata.Phone = entity.Phone;
                clientdata.OwnerId = entity.OwnerId;               
                _repository.Update(clientdata);
                _unitOfWork.SaveChanges();
                Address userdata = _repository.GetRepository<Address>().Queryable().FirstOrDefault(x => x.OwnerId == clientdata.Id);
                if (userdata != null)
                {
                    userdata.UpdatedAt = DateTime.Now;
                    userdata.UpdatedBy = entity.Id;
                    userdata.ZipCode = entity.PinCode;
                    userdata.City = entity.City;
                    userdata.State = entity.State;
                    _repository.GetRepository<Address>().Update(userdata);
                    _unitOfWork.SaveChanges();
                }
                else
                {
                    Address addr = new Address
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = entity.OwnerId,
                        CountryId = clientdata.CountryId.GetValueOrDefault(),
                        CountryName = clientdata.CountryName,
                        ZipCode = entity.PinCode,
                        City = entity.City,
                        State = entity.State,
                    };
                    _repository.GetRepository<Address>().Insert(addr);
                    _unitOfWork.SaveChanges();
                }
            }           
        }

    }

    public class MarketingInfoService : Service<MarketingInfo>, IMarketingInfoService
    {
        private IGenericRepository<MarketingInfo> _repository;
        private IUnitOfWork _unitOfWork;
        public MarketingInfoService(IGenericRepository<MarketingInfo> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }

        public IQueryable<MarketingInfo> GetAll()
        {
            return _repository.Queryable();
        }

        public MarketingInfo GetMarketingInfoByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public MarketingInfo InsertMarketingInfo(MarketingInfo marketingdata)
        {
            try
            {
                var marketingdataexist = _repository.Queryable().Where(x => x.OwnerId == marketingdata.OwnerId).FirstOrDefault();
                if (marketingdataexist == null)
                {
                    MarketingInfo entity = new MarketingInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = marketingdata.OwnerId,
                        AffiliateID = marketingdata.AffiliateID,
                        AffiliateUser = marketingdata.AffiliateUser,
                        AffiliateUserId = marketingdata.AffiliateUserId,
                        AffTransactionID = marketingdata.AffTransactionID,
                        CampaignID = marketingdata.CampaignID,
                        IPAddress = marketingdata.IPAddress,
                        IPCountry = marketingdata.IPCountry,
                        Referrer = marketingdata.Referrer,
                        Source = marketingdata.Source,
                        SubAffiliateID = marketingdata.SubAffiliateID,
                        Tag1 = marketingdata.Tag1,
                        Tag2 = marketingdata.Tag2,
                        UtmCampaign = marketingdata.UtmCampaign,
                        UtmContent = marketingdata.UtmContent,
                        UtmCreative = marketingdata.UtmCreative,
                        UtmMedium = marketingdata.UtmMedium,
                        UtmSource = marketingdata.UtmSource,
                        GoogleKeyword = marketingdata.GoogleKeyword,
                    };
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    return entity;
                }
                else
                {
                    marketingdataexist.AffiliateID = marketingdata.AffiliateID;
                    marketingdataexist.AffiliateUser = marketingdata.AffiliateUser;
                    marketingdataexist.AffiliateUserId = marketingdata.AffiliateUserId;
                    marketingdataexist.AffTransactionID = marketingdata.AffTransactionID;
                    marketingdataexist.CampaignID = marketingdata.CampaignID;
                    marketingdataexist.IPAddress = marketingdata.IPAddress;
                    marketingdataexist.IPCountry = marketingdata.IPCountry;
                    marketingdataexist.OwnerId = marketingdata.OwnerId;
                    marketingdataexist.Referrer = marketingdata.Referrer;
                    marketingdataexist.Source = marketingdata.Source;
                    marketingdataexist.SubAffiliateID = marketingdata.SubAffiliateID;
                    marketingdataexist.Tag1 = marketingdata.Tag1;
                    marketingdataexist.Tag2 = marketingdata.Tag2;
                    marketingdataexist.UtmCampaign = marketingdata.UtmCampaign;
                    marketingdataexist.UtmContent = marketingdata.UtmContent;
                    marketingdataexist.UtmCreative = marketingdata.UtmCreative;
                    marketingdataexist.UtmMedium = marketingdata.UtmMedium;
                    marketingdataexist.UtmSource = marketingdata.UtmSource;
                    marketingdataexist.GoogleKeyword = marketingdata.GoogleKeyword;
                    marketingdataexist.UpdatedAt = DateTime.Now;
                    _repository.Update(marketingdataexist);
                    _unitOfWork.SaveChanges();
                    return marketingdataexist;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }

    public class AdditionalInfoService : Service<AdditionalInfo>, IAdditionalInfoService
    {
        private IGenericRepository<AdditionalInfo> _repository;
        private IUnitOfWork _unitOfWork;
        public AdditionalInfoService(IGenericRepository<AdditionalInfo> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }

        public IQueryable<AdditionalInfo> GetAll()
        {
            return _repository.Queryable();
        }

        public AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public AdditionalInfo InsertAdditionalInfo(AdditionalInfo additionaldata)
        {
            try
            {
                var additionaldataexist = _repository.Queryable().Where(x => x.OwnerId == additionaldata.OwnerId).FirstOrDefault();
                if (additionaldataexist == null)
                {
                    AdditionalInfo entity = new AdditionalInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        AcceptedTermConditions = additionaldata.AcceptedTermConditions,
                        Description = additionaldata.Description,
                        IsOnline = additionaldata.IsOnline,
                        OwnerId = additionaldata.OwnerId,
                        PromoCode = additionaldata.PromoCode,
                        SubscribedNewsletter = additionaldata.SubscribedNewsletter,
                        SuppliedDocs = additionaldata.SuppliedDocs,
                    };
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    return entity;
                }
                else
                {
                    additionaldataexist.AcceptedTermConditions = additionaldata.AcceptedTermConditions;
                    additionaldataexist.Description = additionaldata.Description;
                    additionaldataexist.IsOnline = additionaldata.IsOnline;
                    additionaldataexist.OwnerId = additionaldata.OwnerId;
                    additionaldataexist.PromoCode = additionaldata.PromoCode;
                    additionaldataexist.SubscribedNewsletter = additionaldata.SubscribedNewsletter;
                    additionaldataexist.SuppliedDocs = additionaldata.SuppliedDocs;
                    additionaldataexist.UpdatedAt = DateTime.Now;
                    _repository.Update(additionaldataexist);
                    _unitOfWork.SaveChanges();
                    return additionaldataexist;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class EmailService : Service<Email>, IEmailService
    {
        private IGenericRepository<Email> _repository;
        private IUnitOfWork _unitOfWork;
        private IClientService _clientservice;
        public EmailService(IGenericRepository<Email> repository, IUnitOfWork unitOfWork, IClientService clientservice)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._clientservice = clientservice;

        }

        public IQueryable<Email> GetAll()
        {
            return _repository.Queryable();
        }

        public List<Email> GetEmailByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void CreateEmail(Email email, bool isemailsend)
        {
            try
            {
                if (email.OwnerId != 0)
                {
                    Email entity = new Email
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = email.OwnerId,
                        To = email.To,
                        CC = email.CC,
                        Bcc = email.Bcc,
                        Body = email.Body,
                        Subject = email.Subject,
                        SendDate = DateTime.Now,
                        Sender = email.Sender,
                        AttachementFileName = email.AttachementFileName,

                    };
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    if (isemailsend)
                        SendCreateEmail(email);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SendCreateEmail(Email clientdata)
        {
            try
            {
                MailManager oMailManager = new MailManager();
                oMailManager.Subject = clientdata.Subject;
                oMailManager.Body = clientdata.Body;
                oMailManager.IsBodyHtml = true;
                if (clientdata != null && clientdata.To != string.Empty)
                {
                    oMailManager.To = clientdata.To;
                    oMailManager.SendEmail();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool EmailToAllClients(Email email)
        {
            try
            {
                if (email != null && email.UserId != null)
                {
                    var clientlists = _clientservice.Query(x => x.Active == true && x.Deleted == false && x.OwnerId == email.UserId).Select().ToList();
                    if (clientlists != null && clientlists.Count > 0)
                    {
                        foreach (var client in clientlists)
                        {
                            email.OwnerId = client.Id;
                            email.To = client.Email;
                            CreateEmail(email, true);
                        }
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool EmailToSelectedClients(Email email)
        {
            try
            {
                List<string> toEmails = new List<string>();
                if (email != null && email.To != string.Empty)
                {
                    MailManager oMailManager = new MailManager();
                    oMailManager.Subject = email.Subject;
                    toEmails = email.To.Split(',').ToList<string>();
                    oMailManager.Body = email.Body.ToString();
                    oMailManager.ToEmails = toEmails;
                    oMailManager.IsBodyHtml = true;
                    if (toEmails != null && toEmails.Count > 0)
                    {
                        foreach (var vemailaddress in toEmails)
                        {
                            var clientlists = _clientservice.Query(x => x.Active == true && x.Deleted == false && x.OwnerId == email.UserId && x.Email == vemailaddress.ToString().Trim()).Select().FirstOrDefault();
                            if (clientlists != null)
                            {

                                email.OwnerId = clientlists.Id;
                                email.To = vemailaddress;
                                CreateEmail(email, false);

                            }
                        }
                        oMailManager.SendEmail(oMailManager);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
    public class ShortMessageService : Service<ShortMessage>, IShortMessageService
    {
        private IGenericRepository<ShortMessage> _repository;
        private IUnitOfWork _unitOfWork;
        private IClientService _clientservice;
        public ShortMessageService(IGenericRepository<ShortMessage> repository, IUnitOfWork unitOfWork, IClientService clientservice)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._clientservice = clientservice;
        }

        public IQueryable<ShortMessage> GetAll()
        {
            return _repository.Queryable();
        }

        public List<ShortMessage> GetShortMessageByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public string SendShortMessage(ShortMessage smsdata)
        {
            try
            {
                var responseObject = SendSMSToClient(smsdata);
                if (responseObject.Status == 0)
                {
                    ShortMessage entity = new ShortMessage
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = smsdata.OwnerId,
                        PhoneNumber = smsdata.PhoneNumber,
                        MessageText = smsdata.MessageText,
                        SendDate = DateTime.Now,
                    };
                    _repository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    return "Message Send Successfully !";
                }
                else
                {
                    return responseObject.ErrorMessage;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public RootObject SendSMSToClient(ShortMessage smsdata)
        {
            string API_KEY = ConfigurationManager.AppSettings.Get("smsapikey");
            string API_SECRET = ConfigurationManager.AppSettings.Get("smsapisecretkey");
            double TO = Convert.ToDouble(smsdata.PhoneNumber);
            string Message = smsdata.MessageText;
            string sURL;
            sURL = ConfigurationManager.AppSettings.Get("smsurl").ToString() + API_KEY + "&api_secret=" + API_SECRET + "&to=" + TO + "&text=" + Message;
            try
            {
                using (WebClient client = new WebClient())
                {
                    string smsobject = client.DownloadString(sURL);
                    return JsonConvert.DeserializeObject<RootObject>(smsobject);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<string> SendMessageToAllClients(ShortMessage sms)
        {
            List<string> sheetvalidationmessage = new List<string>();
            try
            {
                if (sms != null && sms.UserId != null)
                {
                    var clientlists = _clientservice.Query(x => x.Active == true && x.Deleted == false && x.OwnerId == sms.UserId).Select().ToList();
                    if (clientlists != null && clientlists.Count > 0)
                    {
                        foreach (var client in clientlists)
                        {
                            sms.OwnerId = client.Id;
                            string strphonenumber = client.Phone.Trim();
                            strphonenumber = strphonenumber.Replace("(", "").Replace(")", "").Replace(" ", "").Replace("-", "");
                            sms.PhoneNumber = client.CountryISDCode + strphonenumber;
                            string strsmsresult = SendShortMessage(sms);
                            sheetvalidationmessage.Add(sms.PhoneNumber + "-" + strsmsresult);
                        }
                    }
                }
                return sheetvalidationmessage;
            }
            catch (Exception ex)
            {
                sheetvalidationmessage.Add(ex.StackTrace);
                return sheetvalidationmessage;
            }
        }
        public List<string> SendMessageToSelectedClients(ShortMessage sms)
        {
            List<string> sheetvalidationmessage = new List<string>();
            try
            {
                List<string> tosms = new List<string>();
                if (sms != null && sms.PhoneNumber != string.Empty)
                {

                    tosms = sms.PhoneNumber.Split(',').ToList<string>();
                    if (tosms != null && tosms.Count > 0)
                    {
                        foreach (var vphonenumber in tosms)
                        {
                            var clientlists = _clientservice.Query(x => x.Active == true && x.Deleted == false && x.OwnerId == sms.UserId && x.Phone == vphonenumber.ToString().Trim()).Select().FirstOrDefault();
                            if (clientlists != null)
                            {

                                sms.OwnerId = clientlists.Id;
                                string strphonenumber = clientlists.Phone.Trim();
                                strphonenumber = strphonenumber.Replace("(", "").Replace(")", "").Replace(" ", "").Replace("-", "");
                                sms.PhoneNumber = clientlists.CountryISDCode + strphonenumber;
                                string strsmsresult = SendShortMessage(sms);
                                sheetvalidationmessage.Add(sms.PhoneNumber + "-" + strsmsresult);

                            }
                        }
                    }
                }
                return sheetvalidationmessage;
            }
            catch (Exception ex)
            {
                sheetvalidationmessage.Add(ex.StackTrace);
                return sheetvalidationmessage;
            }
        }
    }

    public class CommentService : Service<Comment>, ICommentService
    {
        private IGenericRepository<Comment> _repository;
        private IUnitOfWork _unitOfWork;
        public CommentService(IGenericRepository<Comment> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        public void DeleteComment(Comment entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public IQueryable<Comment> GetAll()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted);
        }

        public Comment GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            Comment Client = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id);
            return Client;
        }

        public List<Comment> GetCommentByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void InsertComment(Comment comm)
        {
            try
            {
                Comment entity = new Comment
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    OwnerId = comm.OwnerId,
                    CommentDescription = comm.CommentDescription,
                };
                _repository.Insert(entity);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class AddressService : Service<Address>, IAddressService
    {
        private IGenericRepository<Address> _repository;
        private IUnitOfWork _unitOfWork;
        public AddressService(IGenericRepository<Address> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }

        public Address GetAddressByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void UpdateAddress(Address entity)
        {
            Address userdata = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (userdata != null)
            {
                userdata.UpdatedAt = DateTime.Now;
                userdata.UpdatedBy = entity.Id;
                userdata.ZipCode = entity.ZipCode;
                userdata.City = entity.City;
                userdata.State = entity.State;
                userdata.StreetAddress = entity.StreetAddress;
                userdata.CountryId = entity.CountryId;
                userdata.CountryName = entity.CountryName;
                userdata.ZipCode = entity.ZipCode;
                userdata.OwnerId = entity.OwnerId;
                _repository.Update(userdata);
                _unitOfWork.SaveChanges();
            }
            else
            {
                Address addr = new Address
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    OwnerId = entity.OwnerId,
                    CountryId = entity.CountryId,
                    CountryName = entity.CountryName,
                    ZipCode = entity.ZipCode,
                    City = entity.City,
                    State = entity.State,
                    StreetAddress = entity.StreetAddress,
                };
                _repository.Insert(addr);
                _unitOfWork.SaveChanges();
            }
        }
    }
    public class ImportFileService : Service<ImportFile>, IImportFileService
    {
        private IGenericRepository<ImportFile> _repository;
        private IUnitOfWork _unitOfWork;
        public ImportFileService(IGenericRepository<ImportFile> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }
        public List<ImportFile> GetImportFiles(long UserId)
        {
            return _repository.Query(x => x.Active && !x.Deleted && x.CreatedBy == UserId).Select().ToList();
        }

        public void InsertFileLog(ImportFile importFile)
        {
            _repository.Insert(importFile);
            _unitOfWork.SaveChanges();
        }
    }
}
