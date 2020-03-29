using SitComTech.Model.Common;

namespace SitComTech.Model.DataObject
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
