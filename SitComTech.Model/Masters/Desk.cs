using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.Masters
{
    public class Desk : BaseEntity
    {
        public string Name { get; set; }
        public Nullable<bool> IsShared { get; set; }
    }
}
