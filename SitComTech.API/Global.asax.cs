using SitComTech.API.App_Start;
using System.Web.Http;

namespace SitComTech.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            Bootstrapper.Run();
        }
    }
}
