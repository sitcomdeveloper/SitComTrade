using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    public interface ITradeGroupService : IUnitOfWork<TradeGroup>
    {
        List<TradeGroup> GetTradeGroupList();
    }
}
