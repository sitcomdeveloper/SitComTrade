using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.Masters
{    
    public class ExceptionLogger : BaseEntityState
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string ErrorType { get; set; }
        public Nullable<long> ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
