using System;
using SitComTech.Model.Common;
using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{
    public class ClientMap : EntityTypeConfiguration<Client>
    {
        public ClientMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.UserTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }


    public class AddressMap : EntityTypeConfiguration<Address>
    {
        public AddressMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
            HasRequired(a => a.CountryTable).WithMany().HasForeignKey(x => x.CountryId).WillCascadeOnDelete(false);

        }

    }

    public class MarketingInfoMap : EntityTypeConfiguration<MarketingInfo>
    {
        public MarketingInfoMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class AdditionalInfoMap : EntityTypeConfiguration<AdditionalInfo>
    {
        public AdditionalInfoMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class EmailMap : EntityTypeConfiguration<Email>
    {
        public EmailMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class ShortMessageMap : EntityTypeConfiguration<ShortMessage>
    {
        public ShortMessageMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }

    public class CommentMap : EntityTypeConfiguration<Comment>
    {
        public CommentMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }

    }
}
