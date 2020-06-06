using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class Email : BaseEntity
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
        public string CC { get; set; }
        public string AttachementFileName { get; set; }
        public virtual Client ClientTable { get; set; }
    }
}
