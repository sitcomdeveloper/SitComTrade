using SitComTech.Framework.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.DataObject
{
    public class ImportFile:BaseEntity
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string Status { get; set; }
        public Nullable<DateTime> InitiatedDate { get; set; }
        public Nullable<DateTime> FinishDate { get; set; }
        public string Errors { get; set; }
        public Nullable<DateTime> DeletedDate { get; set; }
        public Nullable<long> DeletedBy { get; set; }
    }
}
