using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{
    public class UserMap:EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            HasKey(r => r.Id);
            Property(r=>r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class CountryMap : EntityTypeConfiguration<Country>
    {
        public CountryMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class CurrencyMap : EntityTypeConfiguration<Currency>
    {
        public CurrencyMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class AddressMap : EntityTypeConfiguration<Address>
    {
        public AddressMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
            HasRequired(a => a.CountryTable).WithMany().HasForeignKey(x => x.CountryId).WillCascadeOnDelete(false);
           
        }

    }

    public class MarketingInfoMap : EntityTypeConfiguration<MarketingInfo>
    {
        public MarketingInfoMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class AdditionalInfoMap : EntityTypeConfiguration<AdditionalInfo>
    {
        public AdditionalInfoMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class EmailMap : EntityTypeConfiguration<Email>
    {
        public EmailMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class ShortMessageMap : EntityTypeConfiguration<ShortMessage>
    {
        public ShortMessageMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }
}
