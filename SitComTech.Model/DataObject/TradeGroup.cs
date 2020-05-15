using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class TradeGroup : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<Decimal> InitialDeposit { get; set; }
        public string StopOut { get; set; }
        public string MarginCall { get; set; }
        public Nullable<long> OrderCount { get; set; }
        public Nullable<bool> Demo { get; set; }
        public Nullable<Decimal> MinDeposit { get; set; }
        public Nullable<bool> AllowTrade { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<long> LeverageId { get; set; }
        public string LeverageName { get; set; }
    }

}
