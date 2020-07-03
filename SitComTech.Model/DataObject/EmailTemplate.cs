using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.DataObject
{
    public class EmailTemplate:BaseEntity
    {
        public string Name { get; set; }
        public string Subject { get; set; }
        public Nullable<bool> IsSysTemplate { get; set; }
        public Nullable<bool> IsPublic { get; set; }
        public string Template { get; set; }
        public long UserId { get; set; }
    }
}
