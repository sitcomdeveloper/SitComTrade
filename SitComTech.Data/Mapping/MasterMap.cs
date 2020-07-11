using SitComTech.Model.Masters;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace SitComTech.Data.Mapping
{
    public class AffiliateFieldMap : EntityTypeConfiguration<AffiliateField>
    {
        public AffiliateFieldMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class DepartmentMap : EntityTypeConfiguration<Department>
    {
        public DepartmentMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class DeskMap : EntityTypeConfiguration<Desk>
    {
        public DeskMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class ModuleGroupsMap : EntityTypeConfiguration<ModuleGroups>
    {
        public ModuleGroupsMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class ModuleMap : EntityTypeConfiguration<Module>
    {
        public ModuleMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class RoleMap : EntityTypeConfiguration<Role>
    {
        public RoleMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class SenderSettingMap : EntityTypeConfiguration<SenderSetting>
    {
        public SenderSettingMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class ServerTimeZoneMap : EntityTypeConfiguration<ServerTimeZone>
    {
        public ServerTimeZoneMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class CultureCodeMap : EntityTypeConfiguration<CultureCode>
    {
        public CultureCodeMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }
    public class ChangeLogMap : EntityTypeConfiguration<ChangeLog>
    {
        public ChangeLogMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }

    public class ExceptionLoggerMap : EntityTypeConfiguration<ExceptionLogger>
    {
        public ExceptionLoggerMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }

    }
}
