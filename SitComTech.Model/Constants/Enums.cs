using System.ComponentModel;

namespace SitComTech.Model.Constants
{
    public class EnumModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class EnumDescriptionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public enum RegistrationTypeEnum
    {
        [Description("Direct")]
        RegistrationType_Direct = 1,
        [Description("Import")]
        RegistrationType_Import = 2,
        [Description("API")]
        RegistrationType_API = 3,
        [Description("Manual")]
        RegistrationType_Manual = 4
    }

    public enum DataOwnerTypeEnum
    {
        [Description("Owner")]
        Owner = 1,
        [Description("Client")]
        Client = 2,
        [Description("AffiliatedUser")]
        AffiliatedUser = 3,
        [Description("TradeAccount")]
        TradeAccount = 4       
    }

    public enum MailProviderEnum
    {
        [Description("DefaultMailProvider")]
        DefaultMailProvider = 1,
        [Description("SendGridProvider")]
        SendGridProvider = 2
    }
}
