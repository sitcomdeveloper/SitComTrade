using SitComTech.Model.Common;

namespace SitComTech.Model.DataObject
{
    public class AdditionalInfo :BaseConfig
    {
        public long OwnerId { get; set; }
        public bool? SuppliedDocs { get; set; }
        public bool? AcceptedTermConditions { get; set; }

        public bool? SubscribedNewsletter { get; set; }

        public bool? IsOnline { get; set; }
        public string Description { get; set; }

        public string PromoCode { get; set; }
        public virtual Client ClientTable { get; set; }
    }
}
