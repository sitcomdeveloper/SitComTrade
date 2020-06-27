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
    }
   
}