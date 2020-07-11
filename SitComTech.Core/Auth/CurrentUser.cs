using SitComTech.Core.Interface;
using System;

namespace SitComTech.Core.Auth
{
    public class CurrentUser : ICurrentUser
    {
        public long UserId
        {
            get
            {
                try
                {
                    return UserIdentity.UserId.Value;
                }
                catch (Exception)
                {
                    return 0;
                }
            }
        }
        public string UserName
        {
            get
            {
                try
                {
                    return UserIdentity.FullName;
                }
                catch (Exception)
                {
                    return "";
                }
            }
        }
    }
}
