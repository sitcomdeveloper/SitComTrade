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
                    };
                    entity.CreatedAt = DateTime.Now;
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
                _repository.Update(clientdata);
            }
        }

        public void DeleteClient(Client entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Delete(entity);
        }


        public Client GetClientDetailById(long Id)
        {
            if ((long)Id == 0)
                return null;
            Client Client = _repository.Queryable().FirstOrDefault(x => x.Id == Id);
            return Client;
        }

        public List<UserResponseStatus> GetLeadStatusList()
        {
            //var dpfRep = _repository.GetRepository<UserResponseStatus>();
            //return dpfRep.Query(x => x.Active).Select().ToList();

            return null;
        }

        public List<Client> GetTradeAccountByType(TradeAccountVM tradeVM)
        {
            return _repository.Queryable().Where(x => (x.TypeName == tradeVM.TypeName) && x.OwnerId == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
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
                Email = x.UserOwner.clients.Email,
                TypeName = x.UserOwner.clients.TypeName,
                Phone = x.UserOwner.clients.Phone,
                OwnerName = x.UserOwner.Owner.FirstName + " " + x.UserOwner.Owner.LastName,
                ResponseStatus = x.UserOwner.clients.ResponseStatus,
                CreatedDate = x.UserOwner.clients.CreatedAt,
                CampaignId = x.MarketInfo.CampaignID,
                Tag = x.MarketInfo.Tag1,
                Tag1 = x.MarketInfo.Tag2,
                FTD = x.UserOwner.clients.FTD,
                Group = "",
                Desk = x.UserOwner.clients.Desk,
                IsEditable=false
            }).ToList();
        }
    }

    public class MarketingInfoService : Service<MarketingInfo>, IMarketingInfoService
    {
        private IGenericRepository<MarketingInfo> _repository;
        private IUnitOfWork _unitOfWork;
        public MarketingInfoService(IGenericRepository<MarketingInfo> repository,IUnitOfWork unitOfWork)
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
        public AdditionalInfoService(IGenericRepository<AdditionalInfo> repository,IUnitOfWork unitOfWork)
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
        public EmailService(IGenericRepository<Email> repository)
            : base(repository)
        {
            this._repository = repository;

        }

        public IQueryable<Email> GetAll()
        {
            return _repository.Queryable();
        }

        public List<Email> GetEmailByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }
    }
    public class ShortMessageService : Service<ShortMessage>, IShortMessageService
    {
        private IGenericRepository<ShortMessage> _repository;
        
        public ShortMessageService(IGenericRepository<ShortMessage> repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public IQueryable<ShortMessage> GetAll()
        {
            return _repository.Queryable();
        }

        public List<ShortMessage> GetShortMessageByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }
    }

    public class CommentService : Service<Comment>, ICommentService
    {
        private IGenericRepository<Comment> _repository;
        private IUnitOfWork _unitOfWork;
        public CommentService(IGenericRepository<Comment> repository,IUnitOfWork unitOfWork)
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
        public AddressService(IGenericRepository<Address> repository,IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }

        public List<Address> GetAddressByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void UpdateAddress(Address entity)
        {
            Address userdata = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (userdata != null)
            {
                userdata.UpdatedAt = DateTime.Now;
                userdata.UpdatedBy = entity.Id;
                userdata.City = entity.City;
                userdata.State = entity.State;
                userdata.StreetAddress = entity.StreetAddress;
                userdata.CountryId = entity.CountryId;
                userdata.CountryName = entity.CountryName;
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
}
