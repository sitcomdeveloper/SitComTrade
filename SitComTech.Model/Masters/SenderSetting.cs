using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{
    class SenderSetting:BaseEntity
    {
        public string SenderMailId { get; set; }
        public Nullable<bool> IsShared { get; set; }
    }
}
