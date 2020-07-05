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
        public string MarginCurrency { get; set; }
        public string Description { get; set; }
        public Nullable<long> SpreadAsk { get; set; }
        public Nullable<long> MaximalVolume { get; set; }
        public Nullable<long> VolumeStep { get; set; }
        public Nullable<long> MinimalVolume { get; set; }
        public Nullable<long> MarginHedge { get; set; }
        public Nullable<long> SwapLong { get; set; }
        public Nullable<long> SwapShort { get; set; }
        public Nullable<long> StopLevel { get; set; }
        public Nullable<long> Digits { get; set; }
        public string CalculationMode { get; set; }
        public Nullable<decimal> Commission { get; set; }
        public string SwapType { get; set; }
        public string ThreeDaysSwap { get; set; }
        public string CommissionCurrency { get; set; }
        public Nullable<bool> Hidden { get; set; }
        public Nullable<DateTime> ExpirationDate { get; set; }
        public Nullable<bool> IsDisabled { get; set; }
        public Nullable<long> UserId { get; set; }
    }
}
