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
    public class OwnerTaskService : Service<OwnerTask>,IOwnerTaskService
    {       
        private IGenericRepository<OwnerTask> _repository;
        private IUnitOfWork _unitOfWork;
        public OwnerTaskService(IGenericRepository<OwnerTask> repository, IUnitOfWork unitOfWork)
            :base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;

        }

        public OwnerTask InsertTask(OwnerTask userdata)
        {
            try
            {
                OwnerTask entity = new OwnerTask();
                entity.Active = true;
                entity.Deleted = false;
                entity.CreatedAt = DateTime.Now;
                entity.OwnerId = userdata.OwnerId;
                entity.TaskStatusId = userdata.TaskStatusId;
                entity.TaskTypeId = userdata.TaskTypeId;
                entity.NotiTrasportId = userdata.NotiTrasportId;
                entity.TaskType = userdata.TaskType;
                entity.TaskStatus = userdata.TaskStatus;
                entity.NotiTimeBefore = userdata.NotiTimeBefore;
                entity.CreatedBy = 0;
                entity.CreatedByName = "";
                entity.Description = userdata.Description;
                _repository.Insert(entity);
                _unitOfWork.SaveChanges();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateOwnerTask(OwnerTask entity)
        {           
            OwnerTask taskdata = _repository.Queryable().FirstOrDefault(x=>x.Id==entity.Id);
            if (taskdata != null)
            {
                taskdata.UpdatedAt = DateTime.Now;
                taskdata.UpdatedBy = entity.OwnerId;
                taskdata.Description = entity.Description;
                taskdata.NotiTimeBefore = entity.NotiTimeBefore;
                taskdata.NotiTrasportId = entity.NotiTrasportId;
                taskdata.TaskStatusId = entity.TaskStatusId;
                taskdata.TaskStatus = entity.TaskStatus;
                taskdata.TaskType = entity.TaskType;
                taskdata.TaskTypeId = entity.TaskTypeId;
                taskdata.OwnerId = entity.OwnerId;
                _repository.Update(taskdata);
                _unitOfWork.SaveChanges();
            }
            if (entity == null || taskdata==null)
                throw new ArgumentNullException("Task");
        }

        public void DeleteOwnerTask(OwnerTask entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
        }

        public IQueryable<OwnerTask> GetAll()
        {
            return _repository.Queryable();
        }
        public List<OwnerTask> GetTaskList()
        {
            return _repository.Queryable().ToList();
        }
        public List<OwnerTask> GetTaskByOwnerId(long ownerid)
        {
            return _repository.Queryable().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }       
    }
    public class TaskTypeService : Service<TaskType>,ITaskTypeService
    {
        private IGenericRepository<TaskType> _repository;
        public TaskTypeService(IGenericRepository<TaskType> repository)
            :base(repository)
        {
            this._repository = repository;

        }
        public IQueryable<TaskType> GetAll()
        {
            return _repository.Queryable();
        }
    }
    public class TaskStatusService : Service<TaskStatus>,ITaskStatusService
    {
        private IGenericRepository<TaskStatus> _repository;
        public TaskStatusService(IGenericRepository<TaskStatus> repository)
            :base(repository)
        {
            this._repository = repository;
        }
        public IQueryable<TaskStatus> GetAll()
        {
            return _repository.Queryable();
        }
    }
}
