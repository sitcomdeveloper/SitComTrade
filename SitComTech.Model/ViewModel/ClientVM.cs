using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.ViewModel
{
    public class ClientDataVM
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public Nullable<long> CountryId { get; set; }
        public string CountryName { get; set; }

        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }

        public string Promocode { get; set; }

        public string Password { get; set; }

        public long OwnerId { get; set; }

    }

    public class ClientListVM
    {
        public string ItemId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CountryName { get; set; }
        public string Email { get; set; }
        public string TypeName { get; set; }
        public string Phone { get; set; }
        public string OwnerName { get; set; }
        public string ResponseStatus { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CampaignId { get; set; }
        public string Tag { get; set; }
        public string Tag1 { get; set; }
        public bool? FTD { get; set; }
        public string Group { get; set; }
        public string Desk { get; set; }
    }

    public class TradeAccountVM
    {
        public string TypeName { get; set; }
        public long OwnerId { get; set; }
    }
}
