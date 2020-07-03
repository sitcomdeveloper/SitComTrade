using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{
    public class SenderSetting:BaseEntity
    {
        public string SenderMailId { get; set; }
        public Nullable<bool> IsShared { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }        
        public Nullable<long> ProviderId { get; set; }
        public string ProviderName { get; set; }
        public string ServerAddress { get; set; }        
        public Nullable<int> PortNo { get; set; }
        public string FromAddress { get; set; }
        public string MailPassword { get; set; }
        public Nullable<bool> UseSSL { get; set; }
        
        
    }
}
