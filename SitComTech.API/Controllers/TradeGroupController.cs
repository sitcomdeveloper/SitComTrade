using SitComTech.Core.Interface;
using SitComTech.Model.DataObject;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{    
    [RoutePrefix("api/TradeGroup")]
    public class TradeGroupController : ApiController
    {

        private ITradeGroupService _tradegroupService;
        public TradeGroupController(ITradeGroupService tradegroupService)
        {
            this._tradegroupService = tradegroupService;
           
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

    }
}