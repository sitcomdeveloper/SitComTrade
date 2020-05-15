using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SitComTech.API.App_Start;
using SitComTech.API.Auth;
using Unity.WebApi;

[assembly: OwinStartup(typeof(SitComTech.API.Startup))]

namespace SitComTech.API
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            HttpConfiguration config = new HttpConfiguration
            {
                DependencyResolver = new UnityDependencyResolver(
                UnityConfig.GetConfiguredContainer())
            };
            ConfigureAuth(app);
            WebApiConfig.Register(config);            
            app.UseWebApi(config);
        }
        private void ConfigureAuth(IAppBuilder app)
        {
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {

                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new AuthorizationServerProvider(),
                RefreshTokenProvider = new RefreshTokenProvider()
            };

            // Token Generation
            //app.UseCookieAuthentication(CookieOptions);
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }
    }
}
