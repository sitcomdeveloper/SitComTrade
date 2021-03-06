﻿using SitComTech.Model.DataObject;
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
        public Nullable<long> CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public Nullable<long> GroupId { get; set; }
        public string GroupName { get; set; }

        public Nullable<bool> ISendEmail { get; set; }

        public string AccountType { get; set; }

        public string Password { get; set; }

        public long OwnerId { get; set; }
        public string CountryISDCode { get; set; }
        public Nullable<long> ConvertionDeskId { get; set; }
        public string ConvertionDeskName { get; set; }
        public Nullable<long> RealAccountTypeId { get; set; }
        public string RealAccountTypeName { get; set; }
        public string TradeAccountType { get; set; }
        public string PreferredLanguage { get; set; }
        public string PromoCode { get; set; }
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
        public string FirstOwner { get; set; }
        public Nullable<DateTime> LastCallDate { get; set; }
        public string PreviousOwner { get; set; }
        public Nullable<long> ConvertionDeskId { get; set; }
        public string ConvertionDeskName { get; set; }
        public Nullable<long> RealAccountTypeId { get; set; }
        public string RealAccountTypeName { get; set; }
        public string TradeAccountType { get; set; }
        public string PreferredLanguage { get; set; }
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
    public class ClientAddressVM
    {
        public long Id { get; set; }        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<long> CountryId { get; set; }
        public string CountryName { get; set; }
        public string Email { get; set; }      
        public string Phone { get; set; }        
        public long OwnerId { get; set; }
        public string Mobile { get; set; }       
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string CountryISDCode { get; set; }
    }

    public class ClientPasswordVM
    {
        public long Id { get; set; }       
        public string Email { get; set; }
        public string OldPassword { get; set; }       
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
    public class ClientAuthVM
    {
        public string ClientId { get; set; }
        public string Password { get; set; }
    }
    public class ClientTradeVM
    {
        public Client Client { get; set; }
        public TradeAccount TradeAccount { get; set; }
    }
}
