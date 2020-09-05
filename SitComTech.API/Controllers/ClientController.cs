using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Model.Constants;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

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
            , IEmailService emailService, IShortMessageService shortMeassageService, ICommentService commentService, IAddressService addressService, IImportFileService importFileService)
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
                if (clientIds != null && clientIds.Count > 0)
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
        [Route("GetTradeAccountDetailWithAddressById")]
        public ClientAddressVM GetTradeAccountDetailWithAddressById(string email)
        {
            return _clientService.GetTradeAccountDetailWithAddressById(email);
        }

        [HttpPost]
        [Route("UpdateClientWithAddress")]
        public void UpdateClientWithAddress(ClientAddressVM clientVM)
        {
            _clientService.UpdateClientWithAddress(clientVM);
        }
        [HttpPost]
        [Route("UpdatePasswordOfClient")]
        public void UpdatePasswordOfClient(ClientPasswordVM clientVM)
        {
            _clientService.UpdatePasswordOfClient(clientVM);
        }

        [HttpPost]
        [Route("InsertClientQuery")]
        public ClientQuery InsertClientQuery(ClientQuery clientVM)
        {
            if (clientVM != null)
                return _clientService.InsertClientQuery(clientVM);
            else
                return null;
        }

        [HttpPost]
        [Route("GetTradeAccountByType")]
        public List<TradeAccountInfoVM> GetTradeAccountByType(TradeAccountVM tradevm)
        {
            try
            {
                return _clientService.GetTradeAccountByType(tradevm);
            }
            catch(Exception ex)
            {
                throw ex;
            }
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
        [Route("SendShortMessage")]
        public string SendShortMessage(ShortMessage smsdata)
        {
            return _shortMeassageService.SendShortMessage(smsdata);
        }

        [HttpPost]
        [Route("SendMessageToAllClients")]
        public List<string> SendMessageToAllClients(ShortMessage entity)
        {

            try
            {
                if (entity != null)
                {
                    return _shortMeassageService.SendMessageToAllClients(entity);

                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("SendMessageToSelectedClients")]
        public List<string> SendMessageToSelectedClients(ShortMessage entity)
        {

            try
            {
                if (entity != null)
                {
                    return _shortMeassageService.SendMessageToSelectedClients(entity);

                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
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
                foreach (var item in commentdata)
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
            _emailService.CreateEmail(entity, true);
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
        public HeaderNameVM GetColumnHeader()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    //string fileName = "";
                    var postedFile = httpRequest.Files["client_import_fileuploader"];
                    string fileName = Path.GetFileNameWithoutExtension(postedFile.FileName) + $"{DateTime.Now:yyyy-MM-dd_HH-mm-ss-fff}" + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/ImportedFiles/" + fileName);
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
                        CreatedBy = UserIdentity.UserId ?? 0,
                        CreatedByName = UserIdentity.UserName,
                        CreatedAt = DateTime.Now,
                        UpdatedBy = null,
                        UpdatedByName = null,
                        UpdatedAt = null
                    };
                    _importFileService.InsertFileLog(importFile);

                    HeaderNameVM headerName = new HeaderNameVM
                    {
                        HeaderNames = columnNames,
                        FileName = fileName.Substring(0, fileName.IndexOf('.'))
                    };
                    return headerName;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        [HttpPost]
        [Route("ImportClient/{fileName}")]
        public string ImportClient(string fileName)
        {
            var filePath = HttpContext.Current.Server.MapPath("~/ImportedFiles/" + fileName + ".xlsx");
            DataSet data = ExcelReader.ExcelToDataSet(filePath);            
            List<ImportClient> importClients = new List<ImportClient>();
            importClients = (from DataRow dr in data.Tables[0].Rows
                             select new ImportClient()
                             {
                                 FirstName = dr["First Name"].ToString(),
                                 LastName = dr["Last Name"].ToString(),
                                 Email = dr["Email"].ToString(),
                                 Phone = dr["Phone"].ToString(),
                                 Mobile = dr["Mobile"].ToString(),
                                 SecondEmail = dr["Second Email"].ToString(),
                                 Tag = dr["Tag"].ToString(),
                                 Tag1 = dr["Tag1"].ToString(),
                                 CampaignID = dr["Campaign ID"].ToString(),
                                 Country = dr["Country"].ToString(),
                                 OwnerId = long.TryParse(dr["Owner"].ToString(), out var ownerid) ? ownerid : (long?)null,
                                 Status = long.TryParse(dr["Status"].ToString(), out var status) ? status : (long?)null,
                                 CreatedDate = Convert.ToDateTime(dr["Created Date"]),
                                 ZipCode = dr["Zip Code"].ToString(),
                                 City = dr["City"].ToString(),
                                 State = dr["State"].ToString(),
                                 Address = dr["Address"].ToString(),
                                 SuppliedDocs = dr["Supplied Docs"].ToString().ToUpper() == "TRUE" ? true : false,
                                 AcceptedTermsConditions = dr["Accepted Terms & Conditions"].ToString().ToUpper() == "TRUE" ? true : false,
                                 Description = dr["Description"].ToString(),
                                 AffiliateID = dr["Affiliate ID"].ToString(),
                                 SubAffiliateID = dr["Sub Affiliate ID"].ToString(),
                                 Source = dr["Source"].ToString(),
                                 IPAddress = dr["IP Address"].ToString(),
                                 Referrer = dr["Referrer"].ToString(),
                                 IPCountry = dr["IP Country"].ToString(),
                                 ModifiedDate = Convert.ToDateTime(dr["Modified Date"]),
                                 ConvertionOwner = dr["Convertion Owner"].ToString(),
                                 RetentionOwner = dr["Retention Owner"].ToString(),
                                 Citizenship = dr["Citizenship"].ToString(),
                                 DateOfBirth = Convert.ToDateTime(dr["Date Of Birth"].ToString()),
                                 IsEnabled = dr["Enabled"].ToString().ToUpper() == "TRUE" ? true : false,
                                 LastLoginDate = Convert.ToDateTime(dr["Last Login Date"]),
                                 SubscribedNewsletter = dr["Subscribed Newsletter"].ToString().ToUpper() == "TRUE" ? true : false,
                                 Desk = dr["Desk"].ToString(),
                                 UtmContent = dr["Utm Content"].ToString(),
                                 UtmSource = dr["Utm Source"].ToString(),
                                 UtmCampaign = dr["Utm Campaign"].ToString(),
                                 UtmCreative = dr["Utm Creative"].ToString(),
                                 UtmMedium = dr["Utm Medium"].ToString(),
                                 AffTransactionID = dr["Aff Transaction ID"].ToString(),
                                 GoogleKeyword = dr["Google Keyword"].ToString(),
                                 FirstRegistrationDate = Convert.ToDateTime(dr["FirstRegistrationDate"]),
                                 ImportId = dr["ImportId"].ToString(),
                                 AffiliateUser = long.TryParse(dr["AffiliateUser"].ToString(), out var affiliateUser) ? affiliateUser : (long?)null,
                             }).ToList();
            _clientService.ImportClient(importClients);
            return fileName;
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
        [HttpPost]
        [Route("PostFile")]
        public string PostFile()
        {
            string result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/ImportedFiles/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    docfiles.Add(filePath);
                }
                result = "File Uploaded";
            }
            else
            {
                result = "File not found";
            }
            return result;
        }
        [HttpPost]
        [Route("AuthClient")]
        public Client AuthClient(ClientAuthVM clientAuthVM)
        {
            return _clientService.AuthClient(clientAuthVM);            
        }
        [HttpPost]
        [Route("AuthClientByTpAccount")]
        public TradeAccount AuthClientByTpAccount(ClientAuthVM clientAuthVM)
        {
            return _clientService.AuthClientByTpAccount(clientAuthVM);
        }
    }
}