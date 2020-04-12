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
        public Client InsertClient(Client Clientdata)
        {
            try
            {
                var Clientexist = _repository.GetAll().Where(x => x.Email == Clientdata.Email).FirstOrDefault();
                if (Clientexist == null)
                {
                    if (Clientdata == null)
                        throw new ArgumentNullException("Client");
                    Client entity = new Client
                    {
                        Active = true,
                        Deleted = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = 0,
                        CreatedByName = "",
                        FirstName = Clientdata.FirstName,
                        LastName = Clientdata.LastName,
                        Password = Clientdata.Password,
                        Email = Clientdata.Email,
                        CurrencyId = Clientdata.CurrencyId,
                        CurrencyName = Clientdata.CurrencyName,
                        CountryId = Clientdata.CountryId,
                        CountryName = Clientdata.CountryName,
                        Enabled = true,
                        TypeName = "Real",
                        FirstRegistrationDate = DateTime.Now,
                        RegistrationType = "Direct",
                        Promocode = Clientdata.Promocode,
                        Phone = Clientdata.Phone,
                        ResponseStatusId = 7,
                        ResponseStatus = "Interested",
                    };
                    entity.CreatedAt = DateTime.Now;
                    _repository.Insert(entity);
                    SaveChanges();
                }
                return Clientdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(Client entity)
        {
            Client Clientdata = _repository.GetById(entity.Id);
            if (Clientdata != null)
            {
                entity.UpdatedAt = DateTime.Now;
                entity.UpdatedBy = Clientdata.Id;
                entity.UpdatedByName = Clientdata.FirstName;
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
