using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class User : BaseEntity
    {

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
        public string StatusGroup { get; set; }
        public string Desk { get; set; }
        public string RegistrationType { get; set; }
        public string LastTaskDaysPast { get; set; }
        public string DaysAgoClientCreated { get; set; }
        public string Promocode { get; set; }
        public Nullable<long> OwnerId { get; set; }
        public Nullable<long> CitizenshipId { get; set; }
        public Nullable<long> DeskId { get; set; }
        public Nullable<long> TypeId { get; set; }
        public Nullable<long> RegistrationTypeId { get; set; }
        public string ItemId { get; set; }
    }

    public class UserResponseStatus : BaseEntity
    {
        public string Name { get; set; }

    }
}
