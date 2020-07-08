using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{    
    [RoutePrefix("api/IPWhiteList")]
    public class IPWhiteListController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private IIPWhiteListService _IPWhiteListService;
        public IPWhiteListController(IIPWhiteListService IPWhiteListService, IUnitOfWork unitOfWork)
        {
            this._IPWhiteListService = IPWhiteListService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("InsertIPWhiteList")]
        public void InsertIPWhiteList(IPWhiteList entity)
        {
            _IPWhiteListService.InsertIPWhiteList(entity);
        }

        [HttpPost]
        [Route("GetIPWhiteListDetailById/{id}")]
        public IPWhiteList GetIPWhiteListDetailById(long id)
        {
            return _IPWhiteListService.GetIPWhiteListById(id);
        }

        [HttpPost]
        [Route("GetAllIPWhiteLists")]
        public List<IPWhiteList> GetAllIPWhiteLists()
        {
            return _IPWhiteListService.GetIPWhiteList();
        }

        [HttpPost]
        [Route("UpdateIPWhiteList")]
        public void UpdateIPWhiteList(IPWhiteList groupVM)
        {
            _IPWhiteListService.UpdateIPWhiteList(groupVM);
        }

        [HttpPost]
        [Route("DeleteMultipleIPWhiteList")]
        public bool DeleteMultipleIPWhiteList(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {
                    return _IPWhiteListService.DeleteMultipleIPWhiteList(groupIds);

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