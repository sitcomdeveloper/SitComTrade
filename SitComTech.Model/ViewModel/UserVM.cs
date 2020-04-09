using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Model.ViewModel
{
    public class UserVM
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }


    public class UserDataVM
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Country { get; set; }

        public decimal? Currency { get; set; }

        public string Promocode { get; set; }


        public string Password { get; set; }


    }

    public class TradeAccountVM
    {
        public string TypeName { get; set; }
        public long OwnerId { get; set; }
    }

}
