using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class Instrument:BaseEntity
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public Nullable<long> GroupId { get; set; }
        public string GroupName { get; set; }
        public string SpreadType { get; set; }
        public Nullable<long> SpreadBid { get; set; }
        public Nullable<bool> IsTradeForbidden { get; set; }
        public Nullable<long> ContractSize { get; set; }        
        public Nullable<long> LeverageId { get; set; }
        public string LeverageName { get; set; }
        public string ProfitCurrency { get; set; }
        public string SymbolGroup { get; set; }
        public Nullable<long> GapLevel { get; set; }
        public Nullable<long> TradingHoursId { get; set; }
        public Nullable<long> Units { get; set; }
    }
}
