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
        public Nullable<long> SpreadTypeId { get; set; }
        public string SpreadTypeName { get; set; }
        public Nullable<long> SpreadBid { get; set; }
        public Nullable<bool> IsTradeForbidden { get; set; }
        public Nullable<long> ContractSize { get; set; }        
        public Nullable<long> LeverageId { get; set; }
        public string LeverageName { get; set; }
        public Nullable<long> ProfitCurrencyId { get; set; }
        public string ProfitCurrencyName { get; set; }
        public Nullable<long> SymbolGroupId { get; set; }
        public string SymbolGroupName { get; set; }
        public Nullable<long> GapLevel { get; set; }
        public Nullable<long> TradingHoursId { get; set; }
        public string TradingHoursName { get; set; }
        public Nullable<long> UnitId { get; set; }
        public string UnitName { get; set; }
        public Nullable<long> MarginCurrencyId { get; set; }
        public string MarginCurrencyName { get; set; }
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
        public Nullable<long> CalculationModeId { get; set; }
        public string CalculationModeName { get; set; }
        public Nullable<decimal> Commission { get; set; }
        public Nullable<long> SwapTypeId { get; set; }
        public string SwapTypeName { get; set; }
        public Nullable<long> ThreeDaysSwapId { get; set; }
        public string ThreeDaysSwapName { get; set; }
        public Nullable<long> CommissionCurrencyId { get; set; }
        public string CommissionCurrencyName { get; set; }
        public Nullable<bool> Hidden { get; set; }
        public Nullable<DateTime> ExpirationDate { get; set; }
        public Nullable<bool> IsDisabled { get; set; }
        public Nullable<long> UserId { get; set; }
    }
    public class SpreadType : BaseEntity
    {
        public string Name { get; set; }        
    }
    public class CalculationMode : BaseEntity
    {
        public string Name { get; set; }
    }
    public class SymbolGroup : BaseEntity
    {
        public string Name { get; set; }
    }
    public class SwapType : BaseEntity
    {
        public string Name { get; set; }
    }    
    public class TradingHour : BaseEntity
    {
        public string Name { get; set; }
    }
    public class Unit : BaseEntity
    {
        public string Name { get; set; }
    }
    public class DaySwap : BaseEntity
    {
        public string Name { get; set; }
        public string TypeSwap { get; set; }
    }

}
