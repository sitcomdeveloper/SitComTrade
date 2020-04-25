using SitComTech.Core.Interface;
using SitComTech.Model.DataObject;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/Task")]
    public class OwnerTaskController : ApiController
    {
        private IOwnerTaskService _taskService;
        private ITaskTypeService _taskTypeService;
        private ITaskStatusService _taskStatusService;
        public OwnerTaskController(IOwnerTaskService taskService, ITaskTypeService taskTypeService, ITaskStatusService taskStatusService)
        {
            this._taskService = taskService;
            this._taskTypeService = taskTypeService;
            this._taskStatusService = taskStatusService;
        }
        [HttpPost]
        [Route("GetTaskTypes")]
        public List<TaskType> GetTaskTypes()
        {
            return _taskTypeService.GetAll().ToList();
        }
        [HttpPost]
        [Route("GetAllTaskStatus")]
        public List<TaskStatus> GetAllTaskStatus()
        {
            return _taskStatusService.GetAll().ToList();
        }
        [HttpPost]
        [Route("GetAllTasks")]
        public List<OwnerTask> GetAllTasks()
        {
            return _taskService.GetTaskList().ToList();
        }

        [HttpPost]
        [Route("GetTaskByOwnerId/{ownerid}")]
        public List<OwnerTask> GetTaskByOwnerId(long ownerid)
        {
            return _taskService.GetTaskByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("InsertTask")]
        public OwnerTask InsertTask(OwnerTask entity)
        {
            return _taskService.InsertTask(entity);
        }

        [HttpPost]
        [Route("UpdateOwnerTask")]
        public void UpdateOwnerTask(OwnerTask userVM)
        {
            _taskService.Update(userVM);
        }

    }
}