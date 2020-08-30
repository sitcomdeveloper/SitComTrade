using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}