using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{  
    public class IPWhiteList : BaseEntity
    {
        public Nullable<long> UserId { get; set; }
        public string IPAddress { get; set; }
        public string Description { get; set; }
    }
}
