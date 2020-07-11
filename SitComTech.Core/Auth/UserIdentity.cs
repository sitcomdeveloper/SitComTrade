using SitComTech.Model.Constants;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace SitComTech.Core.Auth
{
    public static class UserIdentity
    {

        public static IIdentity User
        {
            get
            {
                return HttpContext.Current.User.Identity;
            }
        }

        public static bool IsAuthenticated
        {
            get
            {
                return User.IsAuthenticated;
            }
        }

        public static long? UserId
        {
            get
            {
                if (IsAuthenticated)
                {
                    ClaimsIdentity claimIdentity = new ClaimsIdentity(User);
                    var userId = claimIdentity.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
                    return long.Parse(userId);
                }
                else
                {
                    return null;
                }
            }
        }
        
        public static string UserName
        {
            get
            {
                if (IsAuthenticated)
                {
                    return User.Name;
                }
                else
                {
                    return "Anonymous";
                }
            }
        }

        public static string FullName
        {
            get
            {
                if (IsAuthenticated)
                {
                    ClaimsIdentity claimIdentity = new ClaimsIdentity(User);
                    var fullname = claimIdentity.Claims.Where(x => x.Type == "FullName").FirstOrDefault().Value;
                    return fullname;
                }
                else
                {
                    return "Anonymous";
                }
            }
        }
    }
}