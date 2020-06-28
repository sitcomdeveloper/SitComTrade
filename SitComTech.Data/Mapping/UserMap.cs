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

    public class UserSharedDeskMap : EntityTypeConfiguration<UserSharedDesk>
    {
        public UserSharedDeskMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            HasRequired(a => a.Desk).WithMany().HasForeignKey(x => x.SharedDeskId).WillCascadeOnDelete(false);
        }
    }
    public class UserRoleMap : EntityTypeConfiguration<UserRole>
    {
        public UserRoleMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            HasRequired(a => a.Role).WithMany().HasForeignKey(x => x.RoleId).WillCascadeOnDelete(false);
        }
    }
    public class UserSharedSenderSettingMap : EntityTypeConfiguration<UserSharedSenderSetting>
    {
        public UserSharedSenderSettingMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            HasRequired(a => a.SenderSetting).WithMany().HasForeignKey(x => x.SenderMailId).WillCascadeOnDelete(false);
        }
    }
}
