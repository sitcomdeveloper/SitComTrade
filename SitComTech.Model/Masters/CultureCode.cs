using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{
    public class CultureCode : BaseEntity
    {
        public string CultureCodeName { get; set; }
        public string UICultureCodeName { get; set; }
    }
}
