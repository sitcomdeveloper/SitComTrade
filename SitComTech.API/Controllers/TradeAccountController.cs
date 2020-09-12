using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.Constants;
using SitComTech.Model.DataObject;
using SitComTech.Model.Masters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/TradeAccount")]

    public class TradeAccountController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private ITradeAccountService _TradeAccountService;
        public TradeAccountController(ITradeAccountService TradeAccountService, IUnitOfWork unitOfWork)
        {
            this._TradeAccountService = TradeAccountService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("CreateTradeAccount")]
        public void CreateTradeAccount(CreateTradeAccountVM entity)
        {
            _TradeAccountService.CreateTradeAccount(entity);
        }

        [HttpPost]
        [Route("GetTradeAccountDetailById/{id}")]
        public TradeAccountInfoVM GetTradeAccountDetailById(long id)
        {
            return _TradeAccountService.GetTradeAccountById(id);
        }

        [HttpPost]
        [Route("GetAllTradeAccounts")]
        public List<TradeAccountInfoVM> GetAllTradeAccounts()
        {
            return _TradeAccountService.GetTradeAccountList();
        }

        [HttpPost]
        [Route("UpdateTradeAccount")]
        public void UpdateTradeAccount(TradeAccount groupVM)
        {
            _TradeAccountService.UpdateTradeAccount(groupVM);
        }



        [HttpPost]
        [Route("DeleteTradeAccountById/{id}")]
        public bool DeleteTradeAccountById(long id)
        {
            try
            {
                if (id != 0)
                {
                    return _TradeAccountService.DeleteTradeAccountById(id);

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
        [Route("AddDeposit")]
        public void AddDeposit(FinancialTransactionVM groupVM)
        {
            _TradeAccountService.AddDeposit(groupVM);
        }

        [HttpPost]
        [Route("GetDocumentType")]
        public List<DocumentType> GetDocumentTypes()
        {
            return _TradeAccountService.GetDocumentTypes();
        }

        [HttpGet]
        [Route("GetTransactionTypeEnum")]
        public JArray GetTransactionTypeEnum()
        {
            var entities = EnumExtensions.GetList<TransactionTypeEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }

        [HttpGet]
        [Route("GetTransactionApprovalEnum")]
        public JArray GetTransactionApprovalEnum()
        {
            var entities = EnumExtensions.GetList<TransactionApprovalEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }

        [HttpPost]
        [Route("AddFinancialTransaction")]
        public void AddFinancialTransaction(FinancialTransaction groupVM)
        {
            _TradeAccountService.AddFinancialTransaction(groupVM);
        }

        [HttpPost]
        [Route("GetFinancialTransactionById/{id}")]
        public FinancialTransaction GetFinancialTransactionById(long id)
        {
            return _TradeAccountService.GetFinancialTransactionById(id);
        }

        [HttpPost]
        [Route("GetFinancialTransactionByClientId/{clientid}")]
        public List<FinancialTransaction> GetFinancialTransactionByClientId(long clientid)
        {
            return _TradeAccountService.GetFinancialTransactionByClientId(clientid);
        }

        [HttpPost]
        [Route("GetFinancialTransactionByTPAccountNumber")]
        public List<FinancialTransaction> GetFinancialTransactionByTPAccountNumber(string tpaccount)
        {
            return _TradeAccountService.GetFinancialTransactionByTPAccountNumber(tpaccount);
        }

        [HttpPost]
        [Route("GetAllFinancialTransactionLists")]
        public List<FinancialTransaction> GetFinancialTransactionList()
        {
            return _TradeAccountService.GetFinancialTransactionList();
        }

        [HttpPost]
        [Route("UpdateFinancialTransaction")]
        public void UpdateFinancialTransaction(FinancialTransaction groupVM)
        {
            _TradeAccountService.UpdateFinancialTransaction(groupVM);
        }

        [HttpPost]
        [Route("DeleteMultipleFinancialTransaction")]
        public bool DeleteMultipleFinancialTransaction(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {
                    return _TradeAccountService.DeleteMultipleFinancialTransaction(groupIds);

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
        [Route("UploadDocuments")]
        public bool UploadDocuments()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    //string fileName = "";
                    var postedFile = httpRequest.Files["uploadedFile"];
                    long ClientId = Convert.ToInt64(httpRequest.Form["ClientId"]);
                    string fileName = Path.GetFileNameWithoutExtension(postedFile.FileName) + $"{DateTime.Now:yyyy-MM-dd_HH-mm-ss-fff}" + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/ImportedFiles/" + fileName);
                    postedFile.SaveAs(filePath);
                    ClientDocument clientDocument = new ClientDocument
                    {
                        DocName = postedFile.FileName,
                        DocPath = fileName,
                        ClientId = ClientId,
                        Active = false,
                        Deleted = false,
                        CreatedBy = UserIdentity.UserId ?? 0,
                        CreatedByName = UserIdentity.UserName,
                        CreatedAt = DateTime.Now,
                        UpdatedBy = null,
                        UpdatedByName = null,
                        UpdatedAt = null
                    };
                    return _TradeAccountService.UploadClientDocuments(clientDocument); ;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("WithdrawalAmount")]
        public bool WithdrawalAmount(WithdrawalTransaction groupVM)
        {
           return _TradeAccountService.WithdrawalAmount(groupVM);
        }
    }
}