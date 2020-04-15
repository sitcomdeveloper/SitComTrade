using System;
using SitComTech.Model.Common;

namespace SitComTech.Model.DataObject
{
    public class ShortMessage :BaseConfig
    {
        public long OwnerId { get; set; }

        public string MessageText { get; set; }

        public Nullable<System.DateTime> SendDate { get; set; }
        public string PhoneNumber { get; set; }

        public string SenderPhoneNumber { get; set; }

        public string StatusName { get; set; }

        public bool? IsSend { get; set; }

        public string ErrorMessage { get; set; }

        public virtual Client ClientTable { get; set; }
    }
}
