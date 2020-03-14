using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Common
{
    public class Country
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public string ISOCode { get; set; }
        public string ISDCode { get; set; }
    }

    public class Currency : BaseConfig
    {
        public string Name { get; set; }

    }
}
