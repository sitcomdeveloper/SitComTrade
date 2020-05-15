﻿using System;

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

        public Nullable<long> GroupId { get; set; }
        public string GroupName { get; set; }

        public Nullable<bool> ISendEmail { get; set; }

        public string AccountType { get; set; }

        public string Password { get; set; }

        public long OwnerId { get; set; }

    }

    public class ClientListVM
    {
        public long Id { get; set; }
        public string ItemId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<long> CountryId { get; set; }
        public string CountryName { get; set; }
        public string Email { get; set; }
        public Nullable<long> TypeId { get; set; }
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
        public bool? IsEditable { get; set; }

    }

    public class TradeAccountVM
    {
        public string TypeName { get; set; }
        public long OwnerId { get; set; }
    }
}
