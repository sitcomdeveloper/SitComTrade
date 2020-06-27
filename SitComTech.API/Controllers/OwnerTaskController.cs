using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Model.Constants;
using SitComTech.Model.DataObject;
using SitComTech.Model.FilterModel;
using System;
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
        [Route("GetTaskByOwnerId")]
        public List<OwnerTask> GetTaskByOwnerId(GetTaskParam taskparam)
        {
            return _taskService.GetTaskByOwnerId(taskparam);
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
            _taskService.UpdateOwnerTask(userVM);
        }

        [HttpPost]
        [Route("DeleteMultipleTasks")]
        public bool DeleteMultipleTasks(List<long> taskIds)
        {
            try
            {
                if (taskIds != null && taskIds.Count > 0)
                {
                    return _taskService.DeleteMultipleTasks(taskIds);

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

        [HttpGet]
        [Route("GetDataOwnerTypeEnum")]
        public JArray GetDataOwnerTypeEnum()
        {
            var entities = EnumExtensions.GetList<DataOwnerTypeEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }
    }
}