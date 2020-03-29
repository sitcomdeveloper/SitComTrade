using SitComTech.Core.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.ViewModel;
using SitComTech.Model.OwnerInformation;
using SitComTech.Model.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/Task")]
    public class TaskController : ApiController
    {
        private ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            this._taskService = taskService;
        }

        [HttpPost]
        [Route("InsertTask")]
        public Task InsertTask(Task entity)
        {            
            return _taskService.InsertTask(entity);
        }
    }
}