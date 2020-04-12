using SitComTech.Core.Interface;
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
        private IUnitOfWork<Country> _countryrepository;
        private IUnitOfWork<Currency> _currencyrepository;
        private IUnitOfWork<MarketingInfo> _marketinginforepository;
        public ClientService(IUnitOfWork<Client> repository, IUnitOfWork<Country> countryrepository, IUnitOfWork<Currency> currencyrepository, IUnitOfWork<MarketingInfo> marketinginforepository)
        {
            this._repository = repository;
            this._countryrepository = countryrepository;
            this._currencyrepository = currencyrepository;
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
                        CurrencyId = clientdata.CurrencyId,
                        CurrencyName = clientdata.CurrencyName,
                        CountryId = clientdata.CountryId,
                        CountryName = clientdata.CountryName,
                        Enabled = true,
                        TypeName = "Real",
                        FirstRegistrationDate = DateTime.Now,
                        RegistrationType = "Direct",
                        Promocode = clientdata.Promocode,
                        Phone = clientdata.Phone,
                        ResponseStatusId = 7,
                        ResponseStatus = "Interested",
                        OwnerId=1,
                    };
                    entity.CreatedAt = DateTime.Now;
                    _repository.Insert(entity);
                    SaveChanges();
                    return entity;
                }
                return null;
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
                entity.UpdatedAt = DateTime.Now;
                entity.UpdatedBy = clientdata.Id;
                entity.UpdatedByName = clientdata.FirstName;
                _repository.Update(entity);
                SaveChanges();
            }
        }

        public void Delete(Client entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Client");
            _repository.Delete(entity);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }
       

        public Client GetClientDetailByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.Id == ownerid).FirstOrDefault();
        }

        public List<UserResponseStatus> GetLeadStatusList()
        {
            //var dpfRep = _repository.GetRepository<UserResponseStatus>();
            //return dpfRep.Query(x => x.Active).Select().ToList();

            return null;
        }

        public List<Client> GetTradeAccountByType(TradeAccountVM tradeVM)
        {
            return _repository.GetAll().Where(x => (x.TypeName == tradeVM.TypeName) && x.Id == tradeVM.OwnerId && x.Active == true && x.Deleted == false).ToList();
        }

        public List<Client> GetAllUsersByOwnerId(long ownerid)
        {
            throw new NotImplementedException();
        }

        public Client GetUserDetailByOwnerId(long ownerid)
        {
            throw new NotImplementedException();
        }
    }
}
