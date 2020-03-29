using SitComTech.Core.Interface;
using SitComTech.Data.Interface;
using SitComTech.Model.Common;
using SitComTech.Model.OwnerInformation;
using SitComTech.Model.Task;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SitComTech.Domain.TaskDomain
{
    public class TaskService : ITaskService
    {       
        private IUnitOfWork<Task> _repository;
        public TaskService(IUnitOfWork<Task> repository)
        {
            this._repository = repository;

        }

        public Task Insert(Task userdata)
        {
            try
            {
                var userexist = _repository.GetAll().Where(x => x.TaskDate == userdata.TaskDate).FirstOrDefault();
                if (userexist == null)
                {
                    if (userdata == null)
                        throw new ArgumentNullException("User");
                    Task entity = new Task();
                    entity.Active = true;
                    entity.Deleted = false;
                    entity.CreatedAt = DateTime.Now;
                    entity.CreatedBy = 0;
                    entity.CreatedByName = "";                  
                    _repository.Insert(entity);
                    SaveChanges();

                }
                return userdata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(Task entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Update(entity);
        }

        public void Delete(Task entity)
        {
            if (entity == null)
                throw new ArgumentNullException("User");
            _repository.Delete(entity);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }

        public IQueryable<Task> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task GetById(object Id)
        {
            throw new NotImplementedException();
        }

        void IUnitOfWork<Task>.Insert(Task entity)
        {
            throw new NotImplementedException();
        }

       
    }
}
