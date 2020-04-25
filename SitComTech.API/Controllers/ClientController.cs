using Newtonsoft.Json.Linq;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using SitComTech.Model.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/Client")]
    public class ClientController : ApiController
    {

        private IClientService _clientService;
        private IMarketingInfoService _marketingInfoService;
        private IAdditionalInfoService _additionalInfoeService;
        private IEmailService _emailService;
        private IShortMessageService _shortMeassageService;
        private ICommentService _commentService;
        private IAddressService _addressService;
        public ClientController(IClientService clientService, IMarketingInfoService marketingInfoService, IAdditionalInfoService additionalInfoeService
            , IEmailService emailService, IShortMessageService shortMeassageService, ICommentService commentService, IAddressService addressService)
        {
            this._clientService = clientService;
            this._marketingInfoService = marketingInfoService;
            this._additionalInfoeService = additionalInfoeService;
            this._emailService = emailService;
            this._shortMeassageService = shortMeassageService;
            this._commentService = commentService;
            this._addressService = addressService;
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        [HttpPost]
        [Route("AddClient")]
        public Client AddClient(ClientDataVM clientVM)
        {
            if (clientVM != null)
                return _clientService.InsertClient(clientVM);
            else
                return null;
        }

        [HttpPost]
        [Route("DeleteClient/{Id}")]
        public bool DeleteClient(long Id)
        {
            try
            {
                Client clientdata = _clientService.GetById(Id);
                if (clientdata != null)
                {
                    _clientService.Delete(clientdata);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        [HttpPost]
        [Route("UpdateClient")]
        public void UpdateClient(Client userVM)
        {
            _clientService.Update(userVM);
        }

        [HttpPost]
        [Route("GetAllClientsByOwnerId/{ownerid}")]
        public List<ClientListVM> GetAllClientsByOwnerId(int ownerid)
        {
            return _clientService.GetAllClientsByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("GetTradeAccountByType")]
        public List<Client> GetTradeAccountByType(TradeAccountVM tradevm)
        {
            return _clientService.GetTradeAccountByType(tradevm);
        }

        [HttpGet]
        [Route("GetMarketingInfoByOwnerId/{ownerid}")]
        public MarketingInfo GetMarketingInfoByOwnerId(long ownerid)
        {
            return _marketingInfoService.GetMarketingInfoByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetAdditionalInfoByOwnerId/{ownerid}")]
        public AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid)
        {
            return _additionalInfoeService.GetAdditionalInfoByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetEmailByOwnerId/{ownerid}")]
        public List<Email> GetEmailByOwnerId(long ownerid)
        {
            return _emailService.GetEmailByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetShortMessageByOwnerId/{ownerid}")]
        public List<ShortMessage> GetShortMessageByOwnerId(long ownerid)
        {
            return _shortMeassageService.GetShortMessageByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetClientDetailById/{id}")]
        public Client GetClientDetailById(long id)
        {
            return _clientService.GetClientDetailById(id);
        }

        [HttpPost]
        [Route("InsertMarketingInfo")]
        public MarketingInfo InsertMarketingInfo(MarketingInfo marketingVM)
        {
            if (marketingVM != null)
                return _marketingInfoService.InsertMarketingInfo(marketingVM);
            else
                return null;
        }

        [HttpPost]
        [Route("InsertAdditionalInfo")]
        public AdditionalInfo InsertAdditionalInfo(AdditionalInfo additionalVM)
        {
            if (additionalVM != null)
                return _additionalInfoeService.InsertAdditionalInfo(additionalVM);
            else
                return null;
        }

        [HttpPost]
        [Route("GetCommentByOwnerId/{ownerid}")]
        public List<Comment> GetCommentByOwnerId(long ownerid)
        {
            return _commentService.GetCommentByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("InsertComment")]
        public void InsertComment(Comment entity)
        {
             _commentService.Insert(entity);
        }

        [HttpPost]
        [Route("DeleteComment/{Id}")]
        public bool DeleteComment(long Id)
        {
            try
            {
                Comment commentdata = _commentService.GetById(Id);
                if (commentdata != null)
                {
                    _commentService.Delete(commentdata);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        [HttpPost]
        [Route("DeleteAllComment")]
        public bool DeleteAllComment()
        {
            try
            {
                List<Comment> commentdata = _commentService.GetAll().ToList();
                foreach(var item in commentdata)
                {
                    _commentService.Delete(item);
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        [HttpPost]
        [Route("GetAddressByOwnerId/{ownerid}")]
        public List<Address> GetAddressByOwnerId(long ownerid)
        {
            return _addressService.GetAddressByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("InsertUpdateAddress")]
        public void InsertUpdateAddress(Address entity)
        {
            _addressService.Update(entity);
        }

        [HttpGet]
        [Route("GetRegistrationTypeEnum")]
        public JArray GetRegistrationTypeEnum()
        {
            var entities = EnumExtensions.GetList<RegistrationTypeEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }
    }
}