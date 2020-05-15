using SitComTech.Framework.DataContext;

namespace SitComTech.Model.DataObject
{
    public class Address : BaseEntity
    {

        public long OwnerId { get; set; }

        public long CountryId { get; set; }

        public string CountryName { get; set; }

        public string ZipCode { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string StreetAddress { get; set; }

        public virtual Client ClientTable { get; set; }
        public virtual Country CountryTable { get; set; }
    }


}
