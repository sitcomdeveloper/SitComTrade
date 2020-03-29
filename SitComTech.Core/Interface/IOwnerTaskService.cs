﻿using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface IOwnerTaskService : IUnitOfWork<OwnerTask>
    {
        List<OwnerTask> GetTaskList();
        OwnerTask InsertTask(OwnerTask taskentity);

    }
    public interface ITaskTypeService : IUnitOfWork<TaskType>
    {

    }
    public interface ITaskStatusService : IUnitOfWork<TaskStatus>
    {
    }

}
