using SitComTech.Core.Utils;
using SitComTech.Framework.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SitComTech.Model.Masters;
using SitComTech.Model.DataObject;

namespace SitComTech.API.Controllers
{    
    [RoutePrefix("api/Common")]
    public class CommonController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public CommonController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }        

        /// <summary>
        ///  Get All Affiliate Fields
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllAffiliateFields")]
        public List<AffiliateField> GetAllAffiliateFields()
        {
            try
            {
                var affiliateFields = _unitOfWork.Repository<AffiliateField>().Query(x=>x.Active==true && x.Deleted==false).Select().ToList();
                return affiliateFields;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Departments
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllDepartments")]
        public List<Department> GetAllDepartments()
        {
            try
            {
                var departments = _unitOfWork.Repository<Department>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return departments;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Desks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllDesks")]
        public List<Desk> GetAllDesks()
        {
            try
            {
                var desks = _unitOfWork.Repository<Desk>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return desks;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Module Groups
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllModuleGroups")]
        public List<ModuleGroups> GetAllModuleGroups()
        {
            try
            {
                var moduleGroups = _unitOfWork.Repository<ModuleGroups>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return moduleGroups;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Modules 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllModules")]
        public List<Module> GetAllModules()
        {
            try
            {
                var modules = _unitOfWork.Repository<Module>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return modules;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Roles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllRoles")]
        public List<Role> GetAllRoles()
        {
            try
            {
                var roles = _unitOfWork.Repository<Role>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return roles;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Sender Setting
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllSenderSettings")]
        public List<SenderSetting> GetAllSenderSettings()
        {
            try
            {
                var senderSettings = _unitOfWork.Repository<SenderSetting>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return senderSettings;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All TimeZones
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllTimeZones")]
        public List<ServerTimeZone> GetAllTimeZones()
        {
            try
            {
                var timeZones = _unitOfWork.Repository<ServerTimeZone>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return timeZones;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Roles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllCultureCodes")]
        public List<CultureCode> GetAllCultureCodes()
        {
            try
            {
                var cultureCodes = _unitOfWork.Repository<CultureCode>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return cultureCodes;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  Get All Lead Status
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllLeadStatus")]
        public List<UserResponseStatus> GetAllLeadStatus()
        {
            try
            {
                var leadstatus = _unitOfWork.Repository<UserResponseStatus>().Query(x => x.Active == true && x.Deleted == false).Select().ToList();
                return leadstatus;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetAllHistory/{ownerId}")]
        public List<ChangeLog> GetChangeLogs(int ownerId)
        {
            try
            {
                var changeLogHistory = _unitOfWork.Repository<ChangeLog>().Query(x=>x.OwnerId==ownerId && x.PropertyName != "UpdatedAt").Select().OrderByDescending(x=>x.DateChanged).Take(10).ToList();
                return changeLogHistory;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}