using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{    
    [RoutePrefix("api/TradeGroup")]
    public class TradeGroupController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private ITradeGroupService _tradegroupService;
        public TradeGroupController(ITradeGroupService tradegroupService, IUnitOfWork unitOfWork)
        {
            this._tradegroupService = tradegroupService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("InsertTradeGroup")]
        public void InsertTradeGroup(TradeGroup entity)
        {
            _tradegroupService.InsertTradeGroup(entity);
        }

        [HttpPost]
        [Route("GetTradeGroupDetailById/{id}")]
        public TradeGroup GetTradeGroupDetailById(long id)
        {
            return _tradegroupService.GetById(id);
        }

        [HttpPost]
        [Route("GetAllTradeGroups")]
        public List<TradeGroup> GetAllTradeGroups()
        {
            return _tradegroupService.GetTradeGroupList();
        }

        [HttpPost]
        [Route("UpdateTradeGroup")]
        public void UpdateTradeGroup(TradeGroup groupVM)
        {
            _tradegroupService.UpdateTradeGroup(groupVM);
        }

        /// <summary>
        ///  Get All Leverage
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllLeverageList")]
        public List<Leverage> GetAllLeverageList()
        {
            try
            {
                var leadstatus = _unitOfWork.Repository<Leverage>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return leadstatus;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("DeleteMultipleTradeGroup")]
        public bool v(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {
                    return _tradegroupService.DeleteMultipleTradeGroup(groupIds);

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
    }
}