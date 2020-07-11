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
    public class WorkFlowService : Service<WorkFlow>, IWorkFlowService
    {
        private IGenericRepository<WorkFlow> _repository;
        private IExceptionLoggerService _exceptionloggerService;
        private IUnitOfWork _unitOfWork;
        public WorkFlowService(IGenericRepository<WorkFlow> repository,IExceptionLoggerService exceptionlogger, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._exceptionloggerService = exceptionlogger;
        }

        public WorkFlow GetWorkFlowById(object Id)
        {
            if ((long)Id == 0)
                return null;
            WorkFlow vinstr = _repository.Queryable().FirstOrDefault(x => x.Id == (long)Id && x.Active && !x.Deleted);
            return vinstr;
        }

        public List<WorkFlow> GetWorkFlowList()
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted).ToList();
        }

        public void InsertWorkFlow(WorkFlow entity)
        {
            try
            {
                WorkFlow workflow = new WorkFlow
                {
                    Active = true,
                    Deleted = false,
                    CreatedAt = DateTime.Now,
                    CreatedBy = 0,
                    CreatedByName = "",
                    Name = entity.Name,
                    Event = entity.Event,
                    UserId = entity.UserId,
                    UserName = entity.UserName,
                    ModuleId = entity.ModuleId,
                    ModuleName = entity.ModuleName,
                    IsEnabled = entity.IsEnabled                   
                };
                _repository.Insert(workflow);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateWorkFlow(WorkFlow entity)
        {
            WorkFlow _instrument = _repository.Queryable().FirstOrDefault(x => x.Id == entity.Id);
            if (_instrument != null)
            {
                _instrument.UpdatedAt = DateTime.Now;
                _instrument.Name = entity.Name;
                _instrument.Event = entity.Event;
                _instrument.UserId = entity.UserId;
                _instrument.UserName = entity.UserName;
                _instrument.ModuleId = entity.ModuleId;
                _instrument.ModuleName = entity.ModuleName;
                _instrument.IsEnabled = entity.IsEnabled;              
                _repository.Update(_instrument);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || _instrument == null)
                throw new ArgumentNullException("WorkFlow");
        }
        public void DeleteWorkFlow(WorkFlow entity)
        {
            if (entity == null)
                throw new ArgumentNullException("WorkFlow");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public bool DeleteWorkFlowById(long workFlowId)
        {
            try
            {
                if (workFlowId !=  0)
                {

                    WorkFlow _workflow = base.Queryable().Where(x => x.Active && !x.Deleted && x.Id==workFlowId).FirstOrDefault();
                    if (_workflow != null)
                        DeleteWorkFlow(_workflow);
                }
                return true;
            }
            catch (Exception ex)
            {
                _exceptionloggerService.InsertExceptionLogger(ex.Message, "workflow");
                return false;
            }
        }
    }
}
