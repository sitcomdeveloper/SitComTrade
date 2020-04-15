using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{

    public class TaskMap : EntityTypeConfiguration<OwnerTask>
    {
        public TaskMap()
        {
            HasKey(a => a.Id);
            Property(a => a.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.ClientTable).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
            HasRequired(a => a.TaskTypeTable).WithMany().HasForeignKey(x => x.TaskTypeId).WillCascadeOnDelete(false);
            HasRequired(a => a.TaskStatustable).WithMany().HasForeignKey(x => x.TaskStatusId).WillCascadeOnDelete(false);
            HasRequired(a => a.NotiTransportTable).WithMany().HasForeignKey(x => x.NotiTrasportId).WillCascadeOnDelete(false);
        }

    }

    public class TaskTypeMap : EntityTypeConfiguration<TaskType>
    {
        public TaskTypeMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }


    public class TaskStatusMap : EntityTypeConfiguration<TaskStatus>
    {
        public TaskStatusMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    public class NotiTransportMap : EntityTypeConfiguration<NotiTransport>
    {
        public NotiTransportMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
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

