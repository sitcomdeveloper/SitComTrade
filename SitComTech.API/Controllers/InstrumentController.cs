using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/Instrument")]
    public class InstrumentController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private IInstrumentService _instrumentService;
        public InstrumentController(IInstrumentService instrumentService, IUnitOfWork unitOfWork)
        {
            this._instrumentService = instrumentService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("InsertInstrument")]
        public void InsertInstrument(Instrument entity)
        {
            _instrumentService.InsertInstrument(entity);
        }

        [HttpPost]
        [Route("GetInstrumentDetailById/{id}")]
        public Instrument GetInstrumentDetailById(long id)
        {
            return _instrumentService.GetInstrumentById(id);
        }

        [HttpPost]
        [Route("GetAllInstruments")]
        public List<Instrument> GetAllInstruments()
        {
            return _instrumentService.GetInstrumentList();
        }

        [HttpPost]
        [Route("UpdateInstrument")]
        public void UpdateInstrument(Instrument groupVM)
        {
            _instrumentService.UpdateInstrument(groupVM);
        }

        

        [HttpPost]
        [Route("DeleteMultipleInstrument")]
        public bool DeleteMultipleInstrument(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {
                    return _instrumentService.DeleteMultipleInstrument(groupIds);

                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        ///  Get All SpreadTypes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllSpreadTypes")]
        public List<SpreadType> GetAllSpreadTypes()
        {
            try
            {
                var SpreadTypes = _unitOfWork.Repository<SpreadType>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return SpreadTypes;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All CalculationModes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllCalculationModes")]
        public List<CalculationMode> GetAllCalculationModes()
        {
            try
            {
                var CalculationModes = _unitOfWork.Repository<CalculationMode>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return CalculationModes;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All SymbolGroups
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllSymbolGroups")]
        public List<SymbolGroup> GetAllSymbolGroups()
        {
            try
            {
                var SymbolGroups = _unitOfWork.Repository<SymbolGroup>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return SymbolGroups;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///  Get All SwapTypes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllSwapTypes")]
        public List<SwapType> GetAllSwapTypes()
        {
            try
            {
                var SwapTypes = _unitOfWork.Repository<SwapType>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return SwapTypes;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///  Get All TradingHours
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllTradingHours")]
        public List<TradingHour> GetAllTradingHours()
        {
            try
            {
                var TradingHours = _unitOfWork.Repository<TradingHour>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return TradingHours;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///  Get All Units
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllUnits")]
        public List<Unit> GetAllUnits()
        {
            try
            {
                var Units = _unitOfWork.Repository<Unit>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return Units;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///  Get All DaySwaps
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllDaySwaps/{swaptype}")]
        public List<DaySwap> GetAllDaySwaps(string swaptype)
        {
            try
            {
                var DaySwaps = _unitOfWork.Repository<DaySwap>().Query(x => x.Active == true && x.Deleted == false && x.TypeSwap==swaptype).Select().ToList();
                return DaySwaps;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Currencies
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllCurrencies/{currencytype}")]
        public List<Currency> GetAllCurrencies(string currencytype)
        {
            try
            {
                var DaySwaps = _unitOfWork.Repository<Currency>().Query(x => x.Active == true && x.Deleted == false && x.TypeNameMarginCurrency == currencytype).Select().ToList();
                return DaySwaps;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
   
}