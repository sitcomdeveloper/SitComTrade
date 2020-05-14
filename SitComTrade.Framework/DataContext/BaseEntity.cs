using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SitComTech.Framework.DataContext
{
    public abstract class BaseEntity : IObjectState
    {
        public long Id { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public long CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public DateTime CreatedAt { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public string UpdatedByName { get; set; }

        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
    public abstract class BaseEntityState : IObjectState
    {
        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
}
