using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Common
{
    public abstract class BaseConfig
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
        
    }
}
