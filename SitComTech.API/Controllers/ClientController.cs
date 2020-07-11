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
using System.Web;
using System.Data;
using System.IO;
using SitComTech.Core.Auth;

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
        private IImportFileService _importFileService;
        public ClientController(IClientService clientService, IMarketingInfoService marketingInfoService, IAdditionalInfoService additionalInfoeService
            , IEmailService emailService, IShortMessageService shortMeassageService, ICommentService commentService, IAddressService addressService,IImportFileService importFileService)
        {
            this._clientService = clientService;
            this._marketingInfoService = marketingInfoService;
            this._additionalInfoeService = additionalInfoeService;
            this._emailService = emailService;
            this._shortMeassageService = shortMeassageService;
            this._commentService = commentService;
            this._addressService = addressService;
            this._importFileService = importFileService;
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
                    _clientService.DeleteClient(clientdata);
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
        [Route("DeleteMultipleClients")]
        public bool DeleteMultipleClients(List<long> clientIds)
        {
            try
            {                
                if (clientIds != null && clientIds.Count>0)
                {
                    return _clientService.DeleteMultipleClients(clientIds);
                     
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
        }

        [HttpPost]
        [Route("UpdateClient")]
        public void UpdateClient(Client userVM)
        {
            _clientService.UpdateClient(userVM);
        }

        [HttpPost]
        [Route("UpdateClientStarred")]
        public void UpdateClientStarred(ClientStarredVM clientVM)
        {
            _clientService.UpdateClientStarred(clientVM);
        }

        [HttpPost]
        [Route("GetAllClientsByOwnerId/{ownerid}")]
        public List<ClientListVM> GetAllClientsByOwnerId(int ownerid)
        {
            return _clientService.GetAllClientsByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("GetClientInfoDetailById/{id}")]
        public ClientListVM GetClientInfoDetailById(int id)
        {
            return _clientService.GetClientInfoDetailById(id);
        }

        [HttpGet]
        [Route("GetClientDetailById/{id}")]
        public Client GetClientDetailById(long id)
        {
            return _clientService.GetClientDetailById(id);
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

        [HttpPost]
        [Route("InsertUpdateMarketingInfo")]
        public MarketingInfo InsertUpdateMarketingInfo(MarketingInfo marketingVM)
        {
            if (marketingVM != null)
                return _marketingInfoService.InsertMarketingInfo(marketingVM);
            else
                return null;
        }

        [HttpPost]
        [Route("InsertUpdateAdditionalInfo")]
        public AdditionalInfo InsertUpdateAdditionalInfo(AdditionalInfo additionalVM)
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
             _commentService.InsertComment(entity);
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
                    _commentService.DeleteComment(commentdata);
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
                    _commentService.DeleteComment(item);
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
        public Address GetAddressByOwnerId(long ownerid)
        {
            return _addressService.GetAddressByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("InsertUpdateAddress")]
        public void InsertUpdateAddress(Address entity)
        {
            _addressService.UpdateAddress(entity);
        }

        [HttpGet]
        [Route("GetRegistrationTypeEnum")]
        public JArray GetRegistrationTypeEnum()
        {
            var entities = EnumExtensions.GetList<RegistrationTypeEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }

        [HttpPost]
        [Route("CreateEmail")]
        public void CreateEmail(Email entity)
        {
            _emailService.CreateEmail(entity,true);
        }

        [HttpPost]
        [Route("EmailToAllClients")]
        public bool EmailToAllClients(Email entity)
        {
            
            try
            {
                if (entity != null)
                {
                    return _emailService.EmailToAllClients(entity);

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
        }

        [HttpPost]
        [Route("EmailToSelectedClients")]
        public bool EmailToSelectedClients(Email entity)
        {

            try
            {
                if (entity != null)
                {
                    return _emailService.EmailToSelectedClients(entity);

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
        }
        [HttpPost]
        [Route("GetColumnHeader")]
        [Authorize]
        public List<string> GetColumnHeader()
        {
            var httpRequest = HttpContext.Current.Request;
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                //string fileName = "";
                var postedFile = httpRequest.Files["client_import_fileuploader"];
                string fileName = "ImportedFiles/" + Path.GetFileNameWithoutExtension(postedFile.FileName) + $"{DateTime.Now:yyyy-MM-dd_HH-mm-ss-fff}" + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/"+fileName);
                postedFile.SaveAs(filePath);                

                DataSet data = ExcelReader.ExcelToDataSet(postedFile.InputStream, Path.GetExtension(postedFile.FileName));
                DataTable dt = data.Tables["sheet1"];
                List<string> columnNames = dt.Columns.Cast<DataColumn>()
                                 .Select(x => x.ColumnName)
                                 .ToArray().ToList();
                ImportFile importFile = new ImportFile
                {
                    Title = postedFile.FileName,
                    FilePath = fileName,
                    Status = "",
                    InitiatedDate = DateTime.Now,
                    FinishDate = DateTime.Now,
                    Errors = null,
                    DeletedDate = null,
                    DeletedBy = null,
                    Active = false,
                    Deleted = false,
                    CreatedBy = (long)UserIdentity.UserId,
                    CreatedByName = UserIdentity.UserName,
                    CreatedAt=DateTime.Now,
                    UpdatedBy = null,
                    UpdatedByName = null,
                    UpdatedAt = null
                };
                _importFileService.InsertFileLog(importFile);
                return columnNames;
            }
            return null;
        }
        [HttpPost]
        [Route("GetImportHistory/{UserId}")]
        public List<ImportFile> GetImportHistory(long UserId)
        {
            return _importFileService.GetImportFiles(UserId);
        }
        [HttpPost]
        [Route("UploadClients")]
        public void UploadClients(List<ImportClient> clients)
        {
            _clientService.ImportClient(clients);
        }
    }
}