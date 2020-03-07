using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Common
{
    public abstract class BaseConfig
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<DateTime> UpdatedTime { get; set; }
    }
}
