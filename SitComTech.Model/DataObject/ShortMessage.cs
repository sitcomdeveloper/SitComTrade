using SitComTech.Framework.DataContext;
using System;

namespace SitComTech.Model.DataObject
{
    public class ShortMessage : BaseEntity
    {
        public long OwnerId { get; set; }

        public string MessageText { get; set; }

        public Nullable<System.DateTime> SendDate { get; set; }
        public string PhoneNumber { get; set; }

        public string SenderPhoneNumber { get; set; }

        public string StatusName { get; set; }

        public bool? IsSend { get; set; }

        public string ErrorMessage { get; set; }
        public Nullable<long> UserId { get; set; }
        public virtual Client ClientTable { get; set; }
    }

    public class Response
    {
        public string message_id { get; set; }
        public int message_count { get; set; }
        public double price { get; set; }
    }
    public class RootObject
    {
        public Response Response { get; set; }
        public string ErrorMessage { get; set; }
        public int Status { get; set; }
    }
}
