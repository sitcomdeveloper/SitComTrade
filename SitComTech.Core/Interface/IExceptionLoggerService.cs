using SitComTech.Data.Interface;
using SitComTech.Framework.Services;
using SitComTech.Model.Masters;
using System.Collections.Generic;

namespace SitComTech.Core.Interface
{   
    public interface IExceptionLoggerService : IService<ExceptionLogger>
    { 
        void InsertExceptionLogger(string desc, string clientname);        
    }
}
