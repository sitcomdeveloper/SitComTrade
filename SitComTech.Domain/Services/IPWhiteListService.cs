using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Framework.Repositories;
using SitComTech.Framework.Services;
using SitComTech.Framework.UnitOfWork;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SitComTech.Domain.Services
{    
    public class IPWhiteListService : Service<IPWhiteList>, IIPWhiteListService
    {
        private IGenericRepository<IPWhiteList> _repository;
        private IUnitOfWork _unitOfWork;
        public IPWhiteListService(IGenericRepository<IPWhiteList> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        public IPWhiteList GetIPWhiteListById(object Id)
        {
            if ((long)Id == 0)
                return null;
            IPWhiteList vinstr = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id && x.Active && !x.Deleted);
            return vinstr;
        }

        public List<IPWhiteList> GetIPWhiteList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public void InsertIPWhiteList(IPWhiteList entity)
        {
            try
            {
                IPWhiteList IPWhiteList = new IPWhiteList
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    IPAddress = entity.IPAddress,
                    Description = entity.Description,
                    UserId = entity.UserId
                   
                };
                _repository.Insert(IPWhiteList);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateIPWhiteList(IPWhiteList entity)
        {
            IPWhiteList _instrument = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (_instrument != null)
            {
                _instrument.UpdatedAt = DateTime.Now;
                _instrument.IPAddress = entity.IPAddress;
                _instrument.Description = entity.Description;
                _instrument.UserId = entity.UserId;               
                _repository.Update(_instrument);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _instrument == null)
                throw new ArgumentNullException("IPWhiteList");
        }
        public void DeleteIPWhiteList(IPWhiteList entity)
        {
            if (entity == null)
                throw new ArgumentNullException("IPWhiteList");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }
        public bool DeleteMultipleIPWhiteList(List<long> groupIds)
        {
            try
            {
                if (groupIds != null && groupIds.Count > 0)
                {

                    List<IPWhiteList> groups = base.Queryable().Where(x => x.Active && !x.Deleted && groupIds.Contains(x.Id)).ToList();
                    foreach (var grp in groups)
                    {
                        DeleteIPWhiteList(grp);
                    }
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
