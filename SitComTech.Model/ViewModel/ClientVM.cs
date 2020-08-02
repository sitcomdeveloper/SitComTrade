using System;
using System.Collections.Generic;

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
        public string CountryISDCode { get; set; }

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
        public long? GroupId { get; set; }
        public string GroupName { get; set; }
        public string Desk { get; set; }
        public long OwnerId { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Password { get; set; }
        public Nullable<long> ResponseStatusId { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public bool? Enabled { get; set; }
        public Nullable<long> RetentionOwner { get; set; }
        public Nullable<long> ConvertionOwner { get; set; }
        public Nullable<DateTime> AssignedDate { get; set; }
        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public string ImportId { get; set; }
        public string RegistrationType { get; set; }
        public string LastTaskDaysPast { get; set; }
        public string DaysAgoClientCreated { get; set; }
        public Nullable<bool> ISendEmail { get; set; }
        public Nullable<long> CitizenshipId { get; set; }
        public Nullable<long> DeskId { get; set; }
        public Nullable<long> RegistrationTypeId { get; set; }
        public Nullable<bool> IsStarred { get; set; }
        public string CountryISDCode { get; set; }
    }   
    public class ClientStarredVM
    {
        public bool IsStarred { get; set; }
        public long ClientId { get; set; }
    }
    public class HeaderNameVM
    {
        public List<string> HeaderNames { get; set; }
        public string FileName { get; set; }
    }
}
