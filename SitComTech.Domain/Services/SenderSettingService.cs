using SitComTech.Core.Interface;
using SitComTech.Model.Masters;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{    
    public class SenderSettingService : Service<SenderSetting>, ISenderSettingService
    {
        private IGenericRepository<SenderSetting> _repository;
        private IUnitOfWork _unitOfWork;
        public SenderSettingService(IGenericRepository<SenderSetting> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        public SenderSetting GetSenderSettingById(object Id)
        {
            if ((long)Id == 0)
                return null;
            SenderSetting vinstr = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id && x.Active && !x.Deleted);
            return vinstr;
        }

        public List<SenderSetting> GetSenderSettingList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public void InsertSenderSetting(SenderSetting entity)
        {
            try
            {
                SenderSetting senderSetting = new SenderSetting
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    Name = entity.Name,
                    Description = entity.Description,
                    SenderMailId = entity.SenderMailId,
                    IsShared = entity.IsShared,
                    ProviderId = entity.ProviderId,
                    ProviderName = entity.ProviderName,
                    ServerAddress = entity.ServerAddress,
                    PortNo = entity.PortNo,
                    FromAddress = entity.FromAddress,
                    MailPassword = entity.MailPassword,
                    UseSSL = entity.UseSSL
                };
                _repository.Insert(senderSetting);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateSenderSetting(SenderSetting entity)
        {
            SenderSetting _instrument = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (_instrument != null)
            {
                _instrument.UpdatedAt = DateTime.Now;
                _instrument.Name = entity.Name;
                _instrument.Description = entity.Description;
                _instrument.SenderMailId = entity.SenderMailId;
                _instrument.IsShared = entity.IsShared;
                _instrument.ProviderId = entity.ProviderId;
                _instrument.ProviderName = entity.ProviderName;
                _instrument.ServerAddress = entity.ServerAddress;
                _instrument.PortNo = entity.PortNo;
                _instrument.FromAddress = entity.FromAddress;
                _instrument.MailPassword = entity.MailPassword;
                _instrument.UseSSL = entity.UseSSL;
                _repository.Update(_instrument);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _instrument == null)
                throw new ArgumentNullException("SenderSetting");
        }
        public void DeleteSenderSetting(SenderSetting entity)
        {
            if (entity == null)
                throw new ArgumentNullException("SenderSetting");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteSenderSettingById(long senderSettingId)
        {
            try
            {
                if (senderSettingId != 0)
                {

                    SenderSetting _senderSetting = base.Queryable().Where(x => x.Active && !x.Deleted && x.Id == senderSettingId).FirstOrDefault();
                    if (_senderSetting != null)
                        DeleteSenderSetting(_senderSetting);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
