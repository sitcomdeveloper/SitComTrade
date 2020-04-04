using Autofac;
using Autofac.Integration.WebApi;
using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Data.Repository;
using SitComTech.Domain.Services;
using System.Reflection;
using System.Web.Http;

namespace SitComTech.API.App_Start
{
    public class AutofacWebapiConfig
    {
        public static IContainer Container;
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config,RegisterService(new ContainerBuilder()));
        }
        private static void Initialize(HttpConfiguration config,IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
        private static IContainer RegisterService(ContainerBuilder builder)
        {
            //Register your Web Api Controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<AppDbContext>()
                .As<IDbContext>()
                .InstancePerRequest();

            builder.RegisterGeneric(typeof(UnitOfWork<>)).As(typeof(IUnitOfWork<>));

            builder.RegisterType<UserService>().As<IUserService>();
            builder.RegisterType<OwnerTaskService>().As<IOwnerTaskService>();
            builder.RegisterType<TaskTypeService>().As<ITaskTypeService>();
            builder.RegisterType<TaskStatusService>().As<ITaskStatusService>();
            builder.RegisterType<MarketingInfoService>().As<IMarketingInfoService>();
            builder.RegisterType<AdditionalInfoService>().As<IAdditionalInfoService>();
            builder.RegisterType<EmailService>().As<IEmailService>();
            builder.RegisterType<ShortMessageService>().As<IShortMessageService>();
            return builder.Build();
        }
    }
}