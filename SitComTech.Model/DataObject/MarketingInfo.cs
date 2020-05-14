using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class MarketingInfo : BaseEntity
    {
        public long OwnerId { get; set; }

        public string Tag1 { get; set; }
        public string Tag2 { get; set; }

        public string CampaignID { get; set; }
        public string AffiliateID { get; set; }
        public string SubAffiliateID { get; set; }
        public string Source { get; set; }
        public string IPAddress { get; set; }
        public string Referrer { get; set; }
        public string IPCountry { get; set; }
        public string UtmContent { get; set; }
        public string UtmSource { get; set; }
        public string UtmCampaign { get; set; }
        public string UtmCreative { get; set; }
        public string UtmMedium { get; set; }
        public string GoogleKeyword { get; set; }

        public string AffTransactionID { get; set; }

        public string AffiliateUser { get; set; }

        public Nullable<long> AffiliateUserId { get; set; }

        public virtual Client ClientTable { get; set; }
    }

    public class AffiliateUser : BaseEntity
    {
        public string Name { get; set; }

    }
}
