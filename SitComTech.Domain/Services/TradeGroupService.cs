using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{
   
    public class TradeGroupService : Service<TradeGroup>,ITradeGroupService
    {
        private IGenericRepository<TradeGroup> _repository;
        public TradeGroupService(IGenericRepository<TradeGroup> repository)
            :base(repository)
        {
            this._repository = repository;
        }

        public TradeGroup GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            TradeGroup vTradeGroup = _repository.Queryable().FirstOrDefault(x=>x.Id==(long)Id);
            return vTradeGroup;
        }

        public List<TradeGroup> GetTradeGroupList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }       

        public void InsertTradeGroup(TradeGroup entity)
        {
            try
            {
                TradeGroup tradegrp = new TradeGroup
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    Name=entity.Name,
                    Description=entity.Description,
                    InitialDeposit=entity.InitialDeposit,
                    StopOut=entity.StopOut,
                    MarginCall=entity.MarginCall,
                    OrderCount=entity.OrderCount,
                    Demo=entity.Demo,
                    MinDeposit=entity.MinDeposit,
                    AllowTrade=entity.AllowTrade,
                    CurrencyId=entity.CurrencyId,
                    CurrencyName=entity.CurrencyName,
                    LeverageId=entity.LeverageId,
                    LeverageName=entity.LeverageName
                };
                _repository.Insert(tradegrp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
        public void UpdateTradeGroup(TradeGroup entity)
        {
            TradeGroup _tradegroup = _repository.Queryable().FirstOrDefault(x=>x.Id==entity.Id);
            if (_tradegroup != null)
            {
                _tradegroup.UpdatedAt = DateTime.Now;
                _tradegroup.Description = entity.Description;
                _tradegroup.Name = entity.Name;
                _tradegroup.InitialDeposit = entity.InitialDeposit;
                _tradegroup.StopOut = entity.StopOut;
                _tradegroup.MarginCall = entity.MarginCall;
                _tradegroup.OrderCount = entity.OrderCount;
                _tradegroup.Demo = entity.Demo;
                _tradegroup.MinDeposit = entity.MinDeposit;
                _tradegroup.AllowTrade = entity.AllowTrade;
                _tradegroup.CurrencyId = entity.CurrencyId;
                _tradegroup.CurrencyName = entity.CurrencyName;
                _tradegroup.LeverageId = entity.LeverageId;
                _tradegroup.LeverageName = entity.LeverageName;
                _repository.Update(_tradegroup);                
            }
            if (entity == null || _tradegroup == null)
                throw new ArgumentNullException("Tradegroup");
        }
    }
}
