using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{    
    public interface IWorkFlowService : IService<WorkFlow>
    {
        List<WorkFlow> GetWorkFlowList();
        WorkFlow GetWorkFlowById(object Id);
        void InsertWorkFlow(WorkFlow entity);
        void UpdateWorkFlow(WorkFlow entity);
        bool DeleteWorkFlowById(long workFlowId);
    }
}
