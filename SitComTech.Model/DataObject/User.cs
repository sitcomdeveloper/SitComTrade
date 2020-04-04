using SitComTech.Model.Common;
using System;

namespace SitComTech.Model.DataObject
{
    public class User : BaseConfig
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Country { get; set; }
        public Nullable<long> OwnerId { get; set; }
        public string StatusName { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Description { get; set; }
        public Nullable<long> ConvertionOwner { get; set; }
        public Nullable<long> RetentionOwner { get; set; }
        public string CitizenshipName { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public bool? Enabled { get; set; }

        public string Desk { get; set; }
        public string Password { get; set; }

        public string TypeName { get; set; }
        public Nullable<DateTime> AssignedDate { get; set; }

        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public string ImportId { get; set; }
        public string StatusGroup { get; set; }
        public string AffiliateUser { get; set; }
        public string RegistrationType { get; set; }
        public string LastTaskDaysPast { get; set; }
        public string DaysAgoClientCreated { get; set; }
        public string Promocode { get; set; }

        public Nullable<long> StatusId { get; set; }
        public Nullable<long> CitizenshipId { get; set; }
        public Nullable<long> DeskId { get; set; }
        public Nullable<long> TypeId { get; set; }

        public Nullable<long> RegistrationTypeId { get; set; }

    }
}
