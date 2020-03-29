using SitComTech.Data.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.ViewModel;
using SitComTech.Model.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SitComTech.Core.Interface
{
    public interface ITaskService : IUnitOfWork<Task>
    {
        
        Task Insert(Task taskentity);

    }
}
