using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/WorkFlow")]
    public class WorkFlowController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private IWorkFlowService _workflowService;
        public WorkFlowController(IWorkFlowService workflowService, IUnitOfWork unitOfWork)
        {
            this._workflowService = workflowService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("InsertWorkFlow")]
        public void InsertWorkFlow(WorkFlow entity)
        {
            _workflowService.InsertWorkFlow(entity);
        }

        [HttpPost]
        [Route("GetWorkFlowDetailById/{id}")]
        public WorkFlow GetWorkFlowDetailById(long id)
        {
            return _workflowService.GetWorkFlowById(id);
        }

        [HttpPost]
        [Route("GetAllWorkFlows")]
        public List<WorkFlow> GetAllWorkFlows()
        {
            return _workflowService.GetWorkFlowList();
        }

        [HttpPost]
        [Route("UpdateWorkFlow")]
        public void UpdateWorkFlow(WorkFlow groupVM)
        {
            _workflowService.UpdateWorkFlow(groupVM);
        }



        [HttpPost]
        [Route("DeleteWorkFlowById/{id}")]
        public bool DeleteWorkFlowById(long id)
        {
            try
            {
                if (id != 0)
                {
                    return _workflowService.DeleteWorkFlowById(id);

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