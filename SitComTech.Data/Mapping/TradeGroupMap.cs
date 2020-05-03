using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{
    public class TradeGroupMap : EntityTypeConfiguration<TradeGroup>
    {
        public TradeGroupMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.MinDeposit).HasPrecision(18, 6);
            Property(x => x.InitialDeposit).HasPrecision(18, 6);
        }
    }
}
