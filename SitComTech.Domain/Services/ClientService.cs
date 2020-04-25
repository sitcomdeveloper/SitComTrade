using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{
    public class ClientService : IClientService
    {
        private IUnitOfWork<Client> _repository;       
        private IUnitOfWork<MarketingInfo> _marketinginforepository;
        public ClientService(IUnitOfWork<Client> repository,  IUnitOfWork<MarketingInfo> marketinginforepository)
        {
            this._repository = repository;
            this._marketinginforepository = marketinginforepository;
        }
        public IQueryable<Client> GetAll()
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted);
        }
       
        public Client GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            Client Client = _repository.GetById(Id);
            return Client;
        }
        public void Insert(Client entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Insert(entity);
        }
        public Client InsertClient(ClientDataVM clientdata)
        {
            try
            {
                var Clientexist = _repository.GetAll().Where(x => x.Email == clientdata.Email).FirstOrDefault();
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
                        OwnerId=clientdata.OwnerId,
                    };
                    entity.CreatedAt = DateTime.Now;
                    _repository.Insert(entity);
                    SaveChanges();
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

                string content = "<html><body><p>Dear <b>" + clientdata.FirstName +" "+ clientdata.LastName+ ",</b></p>";
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

        public void Update(Client entity)
        {
            Client clientdata = _repository.GetById(entity.Id);
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
                SaveChanges();
            }
        }

        public void Delete(Client entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Delete(entity);
            SaveChanges();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }
       

        public Client GetClientDetailById(long Id)
        {
            if ((long)Id == 0)
                return null;
            Client Client = _repository.GetById(Id);
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
            return _repository.GetAll().Where(x => (x.TypeName == tradeVM.TypeName) && x.OwnerId == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
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
            return _repository.GetAll().Join(_repository.GetAll(), clients => clients.OwnerId, owner => owner.Id,
                (clients, owner) => new { clients = clients, Owner = owner })
                .GroupJoin(_marketinginforepository.GetAll(), userowner => userowner.clients.Id, mrktinfo => mrktinfo.OwnerId,
                (userowner, mrktinfo) => new { UserOwner = userowner, MarketInfo = mrktinfo })
                .SelectMany(x => x.MarketInfo.DefaultIfEmpty(), (x, y) => new { x.UserOwner, MarketInfo = y })
            .Where(x => x.UserOwner.clients.Active && !x.UserOwner.clients.Deleted && x.UserOwner.clients.OwnerId == ownerid).Select(x =>
            new ClientListVM
            {
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
                Desk = x.UserOwner.clients.Desk
            }).ToList();
        }
    }

    public class MarketingInfoService : IMarketingInfoService
    {
        private IUnitOfWork<MarketingInfo> _repository;
        public MarketingInfoService(IUnitOfWork<MarketingInfo> repository)
        {
            this._repository = repository;

        }
        public void Delete(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MarketingInfo> GetAll()
        {
            return _repository.GetAll();
        }

        public MarketingInfo GetById(object ownerId)
        {
            throw new NotImplementedException();
        }

        public MarketingInfo GetMarketingInfoByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(MarketingInfo entity)
        {
            throw new NotImplementedException();
        }

        public MarketingInfo InsertMarketingInfo(MarketingInfo marketingdata)
        {
            try
            {
                var marketingdataexist = _repository.GetAll().Where(x => x.OwnerId == marketingdata.OwnerId).FirstOrDefault();
                if (marketingdataexist == null)
                {
                    if (marketingdata == null)
                        throw new ArgumentNullException("User");
                    MarketingInfo entity = new MarketingInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = marketingdata.OwnerId,
                    };
                    _repository.Insert(entity);
                    SaveChanges();
                    return entity;
                }
                return marketingdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }

    public class AdditionalInfoService : IAdditionalInfoService
    {
        private IUnitOfWork<AdditionalInfo> _repository;
        public AdditionalInfoService(IUnitOfWork<AdditionalInfo> repository)
        {
            this._repository = repository;

        }
        public void Delete(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<AdditionalInfo> GetAll()
        {
            return _repository.GetAll();
        }

        public AdditionalInfo GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).FirstOrDefault();
        }

        public void Insert(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(AdditionalInfo entity)
        {
            throw new NotImplementedException();
        }

        public AdditionalInfo InsertAdditionalInfo(AdditionalInfo additionaldata)
        {
            try
            {
                var additionaldataexist = _repository.GetAll().Where(x => x.OwnerId == additionaldata.OwnerId).FirstOrDefault();
                if (additionaldataexist == null)
                {
                    if (additionaldata == null)
                        throw new ArgumentNullException("User");
                    AdditionalInfo entity = new AdditionalInfo
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        OwnerId = additionaldata.OwnerId,
                    };
                    _repository.Insert(entity);
                    SaveChanges();
                    return entity;
                }
                return additionaldata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class EmailService : IEmailService
    {
        private IUnitOfWork<Email> _repository;
        public EmailService(IUnitOfWork<Email> repository)
        {
            this._repository = repository;

        }
        public void Delete(Email entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Email> GetAll()
        {
            return _repository.GetAll();
        }

        public Email GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public List<Email> GetEmailByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void Insert(Email entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(Email entity)
        {
            throw new NotImplementedException();
        }
    }
    public class ShortMessageService : IShortMessageService
    {
        private IUnitOfWork<ShortMessage> _repository;
        public ShortMessageService(IUnitOfWork<ShortMessage> repository)
        {
            this._repository = repository;

        }
        public void Delete(ShortMessage entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ShortMessage> GetAll()
        {
            return _repository.GetAll();
        }

        public ShortMessage GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public List<ShortMessage> GetShortMessageByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void Insert(ShortMessage entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(ShortMessage entity)
        {
            throw new NotImplementedException();
        }
    }

    public class CommentService : ICommentService
    {
        private IUnitOfWork<Comment> _repository;
        public CommentService(IUnitOfWork<Comment> repository)
        {
            this._repository = repository;

        }

        public void Delete(Comment entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Delete(entity);
            SaveChanges();
        }

        public IQueryable<Comment> GetAll()
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted);
        }

        public Comment GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            Comment Client = _repository.GetById(Id);
            return Client;
        }

        public List<Comment> GetCommentByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public void Insert(Comment comm)
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
                    OwnerId=comm.OwnerId,
                    CommentDescription=comm.CommentDescription,
                };
                _repository.Insert(entity);
                SaveChanges();               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(Comment entity)
        {
            throw new NotImplementedException();
        }
    }

    public class AddressService : IAddressService
    {
        private IUnitOfWork<Address> _repository;
        public AddressService(IUnitOfWork<Address> repository)
        {
            this._repository = repository;

        }

        public void Delete(Address entity)
        {
            throw new NotImplementedException();
        }

        public List<Address> GetAddressByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }

        public IQueryable<Address> GetAll()
        {
            throw new NotImplementedException();
        }

        public Address GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public void Insert(Address entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(Address entity)
        {
            Address userdata = _repository.GetById(entity.Id);
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
                SaveChanges();
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
                    CountryName= entity.CountryName,
                    ZipCode= entity.ZipCode,
                    City= entity.City,
                    State= entity.State,
                    StreetAddress= entity.StreetAddress,
                };
                _repository.Insert(addr);
                SaveChanges();
            }
        }
    }
}
