using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{
    public class InstrumentService : Service<Instrument>, IInstrumentService
    {
        private IGenericRepository<Instrument> _repository;
        private IUnitOfWork _unitOfWork;
        public InstrumentService(IGenericRepository<Instrument> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        public Instrument GetInstrumentById(object Id)
        {
            if ((long)Id == 0)
                return null;
            Instrument vinstr = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id && x.Active && !x.Deleted);
            return vinstr;
        }

        public List<Instrument> GetInstrumentList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public void InsertInstrument(Instrument entity)
        {
            try
            {
                Instrument instr = new Instrument
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    Name = entity.Name,
                    DisplayName = entity.DisplayName,
                    GroupId = entity.GroupId,
                    GroupName = entity.GroupName,
                    SpreadType = entity.SpreadType,
                    SpreadBid = entity.SpreadBid,
                    IsTradeForbidden = entity.IsTradeForbidden,
                    ContractSize = entity.ContractSize,
                    LeverageId = entity.LeverageId,
                    LeverageName = entity.LeverageName,
                    ProfitCurrency = entity.ProfitCurrency,
                    SymbolGroup = entity.SymbolGroup,
                    GapLevel = entity.GapLevel,
                    TradingHoursId = entity.TradingHoursId,
                    Units = entity.Units,
                    MarginCurrency = entity.MarginCurrency,
                    Description = entity.Description,
                    SpreadAsk = entity.SpreadAsk,
                    MaximalVolume = entity.MaximalVolume,
                    VolumeStep = entity.VolumeStep,
                    MinimalVolume = entity.MinimalVolume,
                    MarginHedge = entity.MarginHedge,
                    SwapLong = entity.SwapLong,
                    SwapShort = entity.SwapShort,
                    StopLevel = entity.StopLevel,
                    Digits = entity.Digits,
                    CalculationMode = entity.CalculationMode,
                    Commission = entity.Commission,
                    SwapType = entity.SwapType,
                    ThreeDaysSwap = entity.ThreeDaysSwap,
                    CommissionCurrency = entity.CommissionCurrency,
                    Hidden = entity.Hidden,
                    ExpirationDate = entity.ExpirationDate,
                    IsDisabled = entity.IsDisabled
                };
                _repository.Insert(instr);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateInstrument(Instrument entity)
        {
            Instrument _instrument = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (_instrument != null)
            {
                _instrument.UpdatedAt = DateTime.Now;
                _instrument.Name = entity.Name;
                _instrument.DisplayName = entity.DisplayName;
                _instrument.GroupId = entity.GroupId;
                _instrument.GroupName = entity.GroupName;
                _instrument.SpreadType = entity.SpreadType;
                _instrument.SpreadBid = entity.SpreadBid;
                _instrument.IsTradeForbidden = entity.IsTradeForbidden;
                _instrument.ContractSize = entity.ContractSize;
                _instrument.LeverageId = entity.LeverageId;
                _instrument.LeverageName = entity.LeverageName;
                _instrument.ProfitCurrency = entity.ProfitCurrency;
                _instrument.SymbolGroup = entity.SymbolGroup;
                _instrument.GapLevel = entity.GapLevel;
                _instrument.TradingHoursId = entity.TradingHoursId;
                _instrument.Units = entity.Units;
                _instrument.MarginCurrency = entity.MarginCurrency;
                _instrument.Description = entity.Description;
                _instrument.SpreadAsk = entity.SpreadAsk;
                _instrument.MaximalVolume = entity.MaximalVolume;
                _instrument.VolumeStep = entity.VolumeStep;
                _instrument.MinimalVolume = entity.MinimalVolume;
                _instrument.MarginHedge = entity.MarginHedge;
                _instrument.SwapLong = entity.SwapLong;
                _instrument.SwapShort = entity.SwapShort;
                _instrument.StopLevel = entity.StopLevel;
                _instrument.Digits = entity.Digits;
                _instrument.CalculationMode = entity.CalculationMode;
                _instrument.Commission = entity.Commission;
                _instrument.SwapType = entity.SwapType;
                _instrument.ThreeDaysSwap = entity.ThreeDaysSwap;
                _instrument.CommissionCurrency = entity.CommissionCurrency;
                _instrument.Hidden = entity.Hidden;
                _instrument.ExpirationDate = entity.ExpirationDate;
                _instrument.IsDisabled = entity.IsDisabled;
                _repository.Update(_instrument);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _instrument == null)
                throw new ArgumentNullException("Instrument");
        }
        public void DeleteInstrument(Instrument entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Instrument");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteMultipleInstrument(List<long> instrumentIds)
        {
            try
            {
                if (instrumentIds != null && instrumentIds.Count > 0)
                {

                    List<Instrument> instruments = base.Queryable().Where(x => x.Active && !x.Deleted && instrumentIds.Contains(x.Id)).ToList();
                    foreach (var grp in instruments)
                    {
                        DeleteInstrument(grp);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
