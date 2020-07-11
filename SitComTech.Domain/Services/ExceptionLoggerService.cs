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
    public class ExceptionLoggerService : Service<ExceptionLogger>, IExceptionLoggerService
    {
        private IGenericRepository<ExceptionLogger> _repository;
        private IUnitOfWork _unitOfWork;
        public ExceptionLoggerService(IGenericRepository<ExceptionLogger> repository, IUnitOfWork unitOfWork)
            : base(repository)
        {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }
       
        public void InsertExceptionLogger(string desc, string clientname)
        {
            try
            {
                ExceptionLogger workflow = new ExceptionLogger
                {                   
                    CreatedDate = DateTime.Now,                   
                    Description = desc,
                    ClientId = 1,
                    ClientName = clientname,
                    ErrorType = ""
                };
                _repository.Insert(workflow);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
    }
}
