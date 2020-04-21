using System;
using SitComTech.Model.Common;
using SitComTech.Model.DataObject;

namespace SitComTech.Model.DataObject
{
    public class Client : BaseConfig
    {
        public long OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Password { get; set; }
        public Nullable<long> ResponseStatusId { get; set; }
        public string ResponseStatus { get; set; }
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<long> CountryId { get; set; }
        public string CountryName { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public bool? Enabled { get; set; }
        public Nullable<long> RetentionOwner { get; set; }
        public Nullable<long> ConvertionOwner { get; set; }
        public string TypeName { get; set; }
        public Nullable<DateTime> AssignedDate { get; set; }
        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public string ImportId { get; set; }
        public string GroupName { get; set; }
        public Nullable<long> GroupId { get; set; }
        public string Desk { get; set; }
        public string RegistrationType { get; set; }
        public string LastTaskDaysPast { get; set; }
        public string DaysAgoClientCreated { get; set; }
        public Nullable<bool> ISendEmail { get; set; }
        public Nullable<long> CitizenshipId { get; set; }
        public Nullable<long> DeskId { get; set; }
        public Nullable<long> TypeId { get; set; }
        public Nullable<long> RegistrationTypeId { get; set; }
        public string ItemId { get; set; }

        public virtual User UserTable { get; set; }
    }

    public class Comment : BaseConfig
    {

        public long OwnerId { get; set; }

        public string CommentDescription { get; set; }

        public virtual Client ClientTable { get; set; }

    }
}
