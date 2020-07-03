using SitComTech.Core.Interface;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using SitComTech.Model.Masters;
using System.Web.Http;
using SitComTech.Core.Utils;
using SitComTech.Model.Constants;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/SenderSetting")]
    public class SenderSettingController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private ISenderSettingService _senderSettingService;
        public SenderSettingController(ISenderSettingService senderSettingService, IUnitOfWork unitOfWork)
        {
            this._senderSettingService = senderSettingService;
            this._unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Route("InsertSenderSetting")]
        public void InsertSenderSetting(SenderSetting entity)
        {
            _senderSettingService.InsertSenderSetting(entity);
        }

        [HttpPost]
        [Route("GetSenderSettingDetailById/{id}")]
        public SenderSetting GetSenderSettingDetailById(long id)
        {
            return _senderSettingService.GetSenderSettingById(id);
        }

        [HttpPost]
        [Route("GetAllSenderSettings")]
        public List<SenderSetting> GetAllSenderSettings()
        {
            return _senderSettingService.GetSenderSettingList();
        }

        [HttpPost]
        [Route("UpdateSenderSetting")]
        public void UpdateSenderSetting(SenderSetting groupVM)
        {
            _senderSettingService.UpdateSenderSetting(groupVM);
        }



        [HttpPost]
        [Route("DeleteSenderSettingById/{id}")]
        public bool DeleteSenderSettingById(long id)
        {
            try
            {
                if (id != 0)
                {
                    return _senderSettingService.DeleteSenderSettingById(id);

                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Route("GetMailProviderEnum")]
        public JArray GetMailProviderEnum()
        {
            var entities = EnumExtensions.GetList<MailProviderEnum>(true);
            return JArray.Parse(JsonConvert.SerializeObject(entities));
        }
    }
}