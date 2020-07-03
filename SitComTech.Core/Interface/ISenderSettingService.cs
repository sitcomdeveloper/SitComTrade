using SitComTech.Model.Masters;
using SitComTech.Framework.Services;
using SitComTech.Model.DataObject;
using System.Collections.Generic;


namespace SitComTech.Core.Interface
{    
    public interface ISenderSettingService : IService<SenderSetting>
    {
        List<SenderSetting> GetSenderSettingList();
        SenderSetting GetSenderSettingById(object Id);
        void InsertSenderSetting(SenderSetting entity);
        void UpdateSenderSetting(SenderSetting entity);
        bool DeleteSenderSettingById(long senderSettingId);
    }
}
