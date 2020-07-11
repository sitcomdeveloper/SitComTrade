using SitComTech.Core.Auth;
using SitComTech.Core.Interface;
using SitComTech.Data.Repository;
using SitComTech.Domain.Services;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.UnitOfWork;
using System;
using System.Configuration;
using Unity;
using Unity.Injection;
using Unity.Lifetime;

namespace SitComTech.API.App_Start
{
    public static class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        private static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>(
                new HierarchicalLifetimeManager(),
                    new InjectionConstructor(ConfigurationManager.ConnectionStrings["AppDbContext"].ConnectionString));
            container.RegisterType(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IOwnerTaskService, OwnerTaskService>();
            container.RegisterType<ITaskTypeService, TaskTypeService>();
            container.RegisterType<ITaskStatusService, TaskStatusService>();
            container.RegisterType<IMarketingInfoService, MarketingInfoService>();
            container.RegisterType<IAdditionalInfoService, AdditionalInfoService>();
            container.RegisterType<IEmailService, EmailService>();
            container.RegisterType<IShortMessageService, ShortMessageService>();
            container.RegisterType<IClientService, ClientService>();
            container.RegisterType<ICommentService, CommentService>();
            container.RegisterType<IAddressService, AddressService>();
            container.RegisterType<ITradeGroupService, TradeGroupService>();
            container.RegisterType<IInstrumentService, InstrumentService>();
            container.RegisterType<IWorkFlowService, WorkFlowService>();
            container.RegisterType<ISenderSettingService, SenderSettingService>();
            container.RegisterType<IEmailTemplateService, EmailTemplateService>();
            container.RegisterType<IIPWhiteListService, IPWhiteListService>();
            container.RegisterType<IImportFileService, ImportFileService>();
            container.RegisterType<ICurrentUser, CurrentUser>();
        }
    }
}