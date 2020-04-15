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

    public class UserResponseStatusMap : EntityTypeConfiguration<UserResponseStatus>
    {
        public UserResponseStatusMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class AffiliateUserMap : EntityTypeConfiguration<AffiliateUser>
    {
        public AffiliateUserMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
