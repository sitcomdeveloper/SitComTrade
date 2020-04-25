using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Model.DataObject;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SitComTech.Domain.Services
{
    public class OwnerTaskService : IOwnerTaskService
    {       
        private IUnitOfWork<OwnerTask> _repository;
        public OwnerTaskService(IUnitOfWork<OwnerTask> repository)
        {
            this._repository = repository;

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
                SaveChanges();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(OwnerTask entity)
        {           
            OwnerTask taskdata = _repository.GetById(entity.Id);
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
                SaveChanges();
            }
            if (entity == null || taskdata==null)
                throw new ArgumentNullException("Task");
        }

        public void Delete(OwnerTask entity)

        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Delete(entity);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public IQueryable<OwnerTask> GetAll()
        {
            return _repository.GetAll();
        }
        public List<OwnerTask> GetTaskList()
        {
            return _repository.GetAll().ToList();
        }
        public List<OwnerTask> GetTaskByOwnerId(long ownerid)
        {
            return _repository.GetAll().Where(x => x.Active && !x.Deleted && x.OwnerId == ownerid).ToList();
        }
        public OwnerTask GetById(object Id)
        {
            throw new NotImplementedException();
        }

        void IUnitOfWork<OwnerTask>.Insert(OwnerTask entity)
        {
            throw new NotImplementedException();
        }

       
    }
    public class TaskTypeService : ITaskTypeService
    {
        private IUnitOfWork<TaskType> _repository;
        public TaskTypeService(IUnitOfWork<TaskType> repository)
        {
            this._repository = repository;

        }
        public void Delete(TaskType entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TaskType> GetAll()
        {
            return _repository.GetAll();
        }

        public TaskType GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public void Insert(TaskType entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(TaskType entity)
        {
            throw new NotImplementedException();
        }
    }
    public class TaskStatusService : ITaskStatusService
    {
        private IUnitOfWork<TaskStatus> _repository;
        public TaskStatusService(IUnitOfWork<TaskStatus> repository)
        {
            this._repository = repository;

        }
        public void Delete(TaskStatus entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TaskStatus> GetAll()
        {
            return _repository.GetAll();
        }

        public TaskStatus GetById(object Id)
        {
            throw new NotImplementedException();
        }

        public void Insert(TaskStatus entity)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public void Update(TaskStatus entity)
        {
            throw new NotImplementedException();
        }
    }
}
