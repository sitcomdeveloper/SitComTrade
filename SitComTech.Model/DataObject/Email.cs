using SitComTech.Model.Common;
using System;

namespace SitComTech.Model.DataObject
{
    public class Email :BaseConfig
    {
        public long OwnerId { get; set; }
        
        public string Subject { get; set; }

        public Nullable<System.DateTime> SendDate { get; set; }
        public string To { get; set; }

        public string Bcc { get; set; }

        public string Sender { get; set; }

        public string StatusName { get; set; }

        public bool? IsSend { get; set; }

        public string ErrorMessage { get; set; }

        public string Body { get; set; }
        public virtual Client ClientTable { get; set; }
    }
}
