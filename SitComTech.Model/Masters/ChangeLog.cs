using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{
    public class ChangeLog: BaseEntityState
    {
        public int Id { get; set; }
        public string EntityName { get; set; }
        public string PropertyName { get; set; }
        public string PrimaryKeyValue { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public Nullable<DateTime> DateChanged { get; set; }
        public Nullable<int> ChangedBy { get; set; }
        public string ChangedByName { get; set; }
        public string IpAddress { get; set; }
        public int OwnerId { get; set; }
    }

}
