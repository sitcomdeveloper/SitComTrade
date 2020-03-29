﻿using SitComTech.Core.Interface;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        [Route("DummyUsers")]
        [HttpPost]
        public List<User> GetUserList()
        {
            var userList = new List<User>();
                //userList.Add(new User { Id=1, UserName = "Abc", Password = "Xyz",Email="abc@gmail.com",Phone="123456789",Active=true,Deleted=false,CreatedBy=1,CreatedTime=DateTime.Now,UpdatedBy=1,UpdatedTime=DateTime.Now });
            return userList;
        }
        [Route("UserList")]
        public List<User> GetUsers()
        {
            return _userService.GetAll().ToList();
        }
        [HttpPost]
        [Route("IsAuthenticated")]
        public List<User> IsAuthenticated(UserVM userVM)
        {
            if (userVM != null)
                return _userService.IsAuthenticated(userVM);
            else
                return null;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public UserDataVM RegisterUser(UserDataVM userVM)
        {
            if (userVM != null)
                return _userService.Insert(userVM);
            else
                return null;
        }

        [HttpPost]
        [Route("GetAllCountries")]
        public List<Country> GetAllCountries()
        {
           return  _userService.GetCountries();
        }

        [HttpPost]
        [Route("GetAllCurrencies")]
        public List<Currency> GetAllCurrencies()
        {
            return _userService.GetCurrencies();
        }

        [HttpPost]
        [Route("GetCountryISDCodeById/{countryid}")]
        public string GetCountryISDCodeById(int countryid)
        {
            return _userService.GetCountryISDCodeById(countryid);
        }
    }
}
