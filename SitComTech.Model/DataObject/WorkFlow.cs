using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{

    public class WorkFlow:BaseEntity
    {
        public Nullable<long> UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Event { get; set; }
        public Nullable<long> ModuleId { get; set; }
        public string ModuleName { get; set; }       
        public Nullable<bool> IsEnabled { get; set; }
    }
}
