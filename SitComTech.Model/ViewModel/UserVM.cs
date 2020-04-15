using System;

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
        public string Phone { get; set; }

        public Nullable<long> CountryId { get; set; }
        public string CountryName { get; set; }

        public Nullable<long>  CurrencyId { get; set; }
        public string CurrencyName { get; set; }

        public string Promocode { get; set; }

        public string Password { get; set; }

    }   

}
