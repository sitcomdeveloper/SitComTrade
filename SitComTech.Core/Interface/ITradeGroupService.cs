using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface ITradeGroupService : IService<TradeGroup>
    {
        List<TradeGroup> GetTradeGroupList();
        TradeGroup GetById(object Id);
    }
}
