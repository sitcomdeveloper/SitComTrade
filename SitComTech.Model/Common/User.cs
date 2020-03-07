using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Common
{
    public class User:BaseConfig
    {
        //public string UserName { get; set; }
        //public string Password { get; set; }
        //public string Email { get; set; }
        //public string Phone { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string SecondEmail { get; set; }
        public string Tag1 { get; set; }
        public string Tag2 { get; set; }
        public Nullable<long> CampaignID { get; set; }
        public Nullable<long> ItemID { get; set; }
        public string Country { get; set; }
        public Nullable<long> Owner { get; set; }
        public string Status { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public bool? SuppliedDocs { get; set; }
        public bool? AcceptedTermConditions { get; set; }
        public string Description { get; set; }
        public Nullable<long> AffiliateID { get; set; }
        public Nullable<long> SubAffiliateID { get; set; }
        public string Source { get; set; }
        public string IPAddress { get; set; }
        public string Referrer { get; set; }
        public string IPCountry { get; set; }
        public Nullable<long> ConvertionOwner { get; set; }
        public Nullable<long> RetentionOwner { get; set; }
        public string Citizenship { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public bool? FTD { get; set; }
        public Nullable<DateTime> FTDDate { get; set; }
        public bool? Enabled { get; set; }
        public Nullable<DateTime> LastLoginDate { get; set; }
        public bool? SubscribedNewsletter { get; set; }
        public string Desk { get; set; }
        public string Password { get; set; }
        public string UtmContent { get; set; }
        public string UtmSource { get; set; }
        public string UtmCampaign { get; set; }
        public string UtmCreative { get; set; }
        public string UtmMedium { get; set; }
        public string AffTransactionID { get; set; }
        public string GoogleKeyword { get; set; }
        public string Type { get; set; }
        public Nullable<DateTime> AssignedDate { get; set; }
        public decimal? TotalDeposits { get; set; }
        public decimal? TotalWithdrawals { get; set; }
        public decimal? NetDeposits { get; set; }
        public string ClientTime { get; set; }
        public bool? HasTasks { get; set; }
        public Nullable<DateTime> TaskCreatedDate { get; set; }
        public Nullable<DateTime> TaskDate { get; set; }
        public bool? HasNotCompletedTasks { get; set; }
        public Nullable<DateTime> LastCommentDate { get; set; }
        public Nullable<DateTime> FirstRegistrationDate { get; set; }
        public decimal? FtdAmount { get; set; }
        public bool? IsOnline { get; set; }
        public string ImportId { get; set; }
        public string StatusGroup { get; set; }
        public string AffiliateUser { get; set; }
        public string RegistrationType { get; set; }
        public string LastTaskDaysPast { get; set; }
        public string DaysAgoClientCreated { get; set; }
        public string Promocode { get; set; }

    }


}
