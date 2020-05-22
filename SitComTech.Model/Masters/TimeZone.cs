using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{
    public class TimeZone:BaseEntity
    {
        public string DisplayName { get; set; }
        public string StandardName { get; set; }
        public Nullable<bool> HasDST { get; set; }
        public string UTCOffset { get; set; }
    }
}
