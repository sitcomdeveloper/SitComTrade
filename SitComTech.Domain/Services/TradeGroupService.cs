using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{
   
    public class TradeGroupService : ITradeGroupService
    {
        private IUnitOfWork<TradeGroup> _repository;
        public TradeGroupService(IUnitOfWork<TradeGroup> repository)
        {
            this._repository = repository;

        }
        public void Delete(TradeGroup entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TradeGroup> GetAll()
        {
            throw new NotImplementedException();
        }

        public TradeGroup GetById(object Id)
        {
            if ((long)Id == 0)
                return null;
            TradeGroup vTradeGroup = _repository.GetById(Id);
            return vTradeGroup;
        }

        public List<TradeGroup> GetTradeGroupList()
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted).ToList();
        }       

        public void Insert(TradeGroup entity)
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
                SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

       
        public void Update(TradeGroup entity)
        {
            TradeGroup _tradegroup = _repository.GetById(entity.Id);
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
                SaveChanges();
            }
            if (entity == null || _tradegroup == null)
                throw new ArgumentNullException("Tradegroup");
        }
    }
}
