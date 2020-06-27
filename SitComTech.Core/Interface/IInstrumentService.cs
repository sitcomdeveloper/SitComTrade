using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{
    
    public interface IInstrumentService : IService<Instrument>
    {
        List<Instrument> GetInstrumentList();
        Instrument GetInstrumentById(object Id);
        void InsertInstrument(Instrument entity);
        void UpdateInstrument(Instrument entity);
        bool DeleteMultipleInstrument(List<long> instrumentIds);
    }
}
