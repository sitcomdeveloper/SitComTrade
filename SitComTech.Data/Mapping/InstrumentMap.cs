using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{
    public class InstrumentMap : EntityTypeConfiguration<Instrument>
    {
        public InstrumentMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class SpreadTypeMap : EntityTypeConfiguration<SpreadType>
    {
        public SpreadTypeMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class CalculationModeMap : EntityTypeConfiguration<CalculationMode>
    {
        public CalculationModeMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class SymbolGroupMap : EntityTypeConfiguration<SymbolGroup>
    {
        public SymbolGroupMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class SwapTypeMap : EntityTypeConfiguration<SwapType>
    {
        public SwapTypeMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class TradingHourMap : EntityTypeConfiguration<TradingHour>
    {
        public TradingHourMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class UnitMap : EntityTypeConfiguration<Unit>
    {
        public UnitMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class DaySwapMap : EntityTypeConfiguration<DaySwap>
    {
        public DaySwapMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
