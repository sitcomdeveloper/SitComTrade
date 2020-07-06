using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{    
    public interface IIPWhiteListService : IService<IPWhiteList>
    {
        List<IPWhiteList> GetIPWhiteList();
        IPWhiteList GetIPWhiteListById(object Id);
        void InsertIPWhiteList(IPWhiteList entity);
        void UpdateIPWhiteList(IPWhiteList entity);
        bool DeleteIPWhiteListById(long iPWhiteListId);
    }
}
