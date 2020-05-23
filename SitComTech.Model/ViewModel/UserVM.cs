using System;

namespace SitComTech.Model.ViewModel
{
    public class UserVM
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }


    public class UserDataVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }        
        public string Password { get; set; }       
        public Nullable<long> OwnerId { get; set; }
        public Nullable<long> DeskId { get; set; }
        public Nullable<bool> IsDisabled { get; set; }
        public string UserName { get; set; }
        public Nullable<bool> IsAffiliateUser { get; set; }
        public string ImageName { get; set; }
        public Nullable<bool> LockoutEnabled { get; set; }
        public string CampaignCode { get; set; }
        public Nullable<long> AffiliateFieldId { get; set; }
        public string AffiliateFieldName { get; set; }
        public string DeskName { get; set; }
        public Nullable<long> RoleId { get; set; }
        public string RoleName { get; set; }
        public Nullable<long> DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public Nullable<long> SharedDeskId { get; set; }
        public string SharedDeskName { get; set; }
        public Nullable<long> TimezoneId { get; set; }
        public string TimezoneName { get; set; }
        public string CultureCode { get; set; }
        public string UiCultureCode { get; set; }
        public Nullable<long> StartModuleId { get; set; }
        public string StartModuleName { get; set; }
        public Nullable<long> DefaultSenderId { get; set; }
        public string DefaultSenderName { get; set; }
        public Nullable<long> SharedSenderId { get; set; }
        public string SharedSenderName { get; set; }
    }
}
