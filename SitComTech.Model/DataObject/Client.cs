using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class Client : BaseEntity
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
        public Nullable<bool> IsStarred { get; set; }
        public string CountryISDCode { get; set; }
        public Nullable<DateTime> LastLoginDate { get; set; }
        public bool? IsOnline { get; set; }
        public string FirstOwner { get; set; }
        public string PreviousOwner { get; set; }
        public Nullable<DateTime> LastCallDate { get; set; }
        public Nullable<long> ConvertionDeskId { get; set; }
        public string ConvertionDeskName { get; set; }
        public virtual User UserTable { get; set; }
    }

    public class Comment : BaseEntity
    {

        public long OwnerId { get; set; }

        public string CommentDescription { get; set; }

        public virtual Client ClientTable { get; set; }

    }
    public class ImportClient:BaseEntityState
    {        
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Tag { get; set; }
        public string Tag1 { get; set; }
        public string CampaignID { get; set; }
        public string Country { get; set; }
        public Nullable<long> OwnerId { get; set; }
        public Nullable<long> Status { get; set; }
        public Nullable<DateTime> CreatedDate { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public Nullable<bool> SuppliedDocs { get; set; }
        public Nullable<bool> AcceptedTermsConditions { get; set; }
        public string Description { get; set; }
        public string AffiliateID { get; set; }
        public string SubAffiliateID { get; set; }
        public string Source { get; set; }
        public string IPAddress { get; set; }
        public string Referrer { get; set; }
        public string IPCountry { get; set; }
        public Nullable<DateTime> ModifiedDate { get; set; }
        public string ConvertionOwner { get; set; }
        public string RetentionOwner { get; set; }
        public string Citizenship { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public Nullable<bool> IsEnabled { get; set; }
        public Nullable<DateTime> LastLoginDate { get; set; }
        public Nullable<bool> SubscribedNewsletter { get; set; }
        public string Desk { get; set; }
        public string UtmContent { get; set; }
        public string UtmSource { get; set; }
        public string UtmCampaign { get; set; }
        public string UtmCreative { get; set; }
        public string UtmMedium { get; set; }
        public string AffTransactionID { get; set; }
        public string GoogleKeyword { get; set; }
        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public string ImportId { get; set; }
        public long? AffiliateUser { get; set; }
    }
}
