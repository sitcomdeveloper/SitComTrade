using SitComTech.Framework.DataContext;

namespace SitComTech.Model.DataObject
{
    public class ClientDocument : BaseEntity
    {
        public string DocName { get; set; }
        public string DocPath { get; set; }
        public long? ClientId { get; set; }
    }

}
