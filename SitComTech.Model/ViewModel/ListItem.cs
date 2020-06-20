using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.ViewModel
{
    public class ListItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Selected { get; set; }
        public string Other { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public long? CommodityId { get; set; }
        public string Utility { get; set; }
        public long? StateId { get; set; }
        public long? CustomerId { get; set; }
        public DateTime Date { get; set; }
        public long UserLoginLevelId { get; set; }
        public long? ReportToId { get; set; }
    }
}
