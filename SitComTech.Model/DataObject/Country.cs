using SitComTech.Framework.DataContext;

namespace SitComTech.Model.DataObject
{
    public class Country:BaseEntityState
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public string ISOCode { get; set; }
        public string ISDCode { get; set; }
    }

    public class Currency : BaseEntity
    {
        public string Name { get; set; }

    }
}
