using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Core.Interface
{
    public interface IOwnerTaskService : IService<OwnerTask>
    {
        List<OwnerTask> GetTaskList();
        OwnerTask InsertTask(OwnerTask taskentity);
        List<OwnerTask> GetTaskByOwnerId(long ownerid);
        void UpdateOwnerTask(OwnerTask entity);
        void DeleteOwnerTask(OwnerTask entity);
    }
    public interface ITaskTypeService : IService<TaskType>
    {
        IQueryable<TaskType> GetAll();
    }
    public interface ITaskStatusService : IService<TaskStatus>
    {
        IQueryable<TaskStatus> GetAll();
    }

}
