﻿using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using SitComTech.API.App_Start;
using SitComTech.Core.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Unity;

namespace SitComTech.API.Auth
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        [Dependency]
        public IUserService userService { get; set; }

        public AuthorizationServerProvider()
        {

        }

        public AuthorizationServerProvider(IUserService userService)
        {
            this.userService = userService;
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {

            string clientId = string.Empty;
            string clientSecret = string.Empty;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {

                context.Validated();
                return Task.FromResult<object>(null);
            }
            context.OwinContext.Set<string>("as:clientAllowedOrigin", "*");
            context.OwinContext.Set<string>("as:clientRefreshTokenLifeTime", DateTime.MaxValue.ToString());

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            userService = UnityConfig.GetConfiguredContainer().Resolve<IUserService>();
            try
            {
                User user = await userService.AuthUser(new UserVM { UserName = context.UserName.Trim(), Password = context.Password.Trim() });
                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);                
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "as:client_id", context.ClientId ??string.Empty },
                    { "UserId",user.Id.ToString() },
                    { "userName", context.UserName },
                    { "FullName",user.FirstName+" "+user.LastName },
                });

                var ticket = new AuthenticationTicket(identity, props);
                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(identity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public override Task MatchEndpoint(OAuthMatchEndpointContext context)
        {
            if (context.IsTokenEndpoint && context.Request.Method == "OPTIONS")
            {
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "authorization" });
                context.RequestCompleted();
                return Task.FromResult(0);
            }

            return base.MatchEndpoint(context);
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            //Ravi To set token expiration time out
            //if (context.TokenIssued)
            //{
            //    // client information
            //    var accessExpiration = DateTimeOffset.Now.AddHours(2);
            //    context.Properties.ExpiresUtc = accessExpiration;
            //}
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}