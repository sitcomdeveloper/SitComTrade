using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{    
    public class WorkFlowMap : EntityTypeConfiguration<WorkFlow>
    {
        public WorkFlowMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
