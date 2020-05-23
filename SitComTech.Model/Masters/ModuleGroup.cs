using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.Masters
{
    public class ModuleGroups : BaseEntity
    {
        public string Name { get; set; }
    }
    public class Module:BaseEntity
    {
        public string Name { get; set; }
        public Nullable<long> ModuleGroupId { get; set; }
        public string ModuleGroupName { get; set; }
    }
}
