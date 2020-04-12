using SitComTech.Core.Interface;
using SitComTech.Core.Utils;
using SitComTech.Model.DataObject;
using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace SitComTech.API.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _userService;
        private IMarketingInfoService _marketingInfoService;
        private IAdditionalInfoService _additionalInfoeService;
        private IEmailService _emailService;
        private IShortMessageService _shortMeassageService;
        public UserController(IUserService userService, IMarketingInfoService marketingInfoService, IAdditionalInfoService additionalInfoeService
            , IEmailService emailService, IShortMessageService shortMeassageService)
        {
            this._userService = userService;
            this._marketingInfoService = marketingInfoService;
            this._additionalInfoeService = additionalInfoeService;
            this._emailService = emailService;
            this._shortMeassageService = shortMeassageService;
        }
        [Route("DummyUsers")]
        [HttpPost]
        public List<User> GetUserList()
        {
            var userList = new List<User>();
            //userList.Add(new User { Id=1, UserName = "Abc", Password = "Xyz",Email="abc@gmail.com",Phone="123456789",Active=true,Deleted=false,CreatedBy=1,CreatedTime=DateTime.Now,UpdatedBy=1,UpdatedTime=DateTime.Now });
            return userList;
        }

        [HttpPost]
        [Route("GetAllUsersByOwnerId/{ownerid}")]
        public List<UserListVM> GetAllUsersByOwnerId(int ownerid)
        {
            return _userService.GetAllUsersByOwnerId(ownerid);
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
        [Route("UpdateUserDetail")]
        public void UpdateUserDetail(User userVM)
        {
            _userService.Update(userVM);
        }

        [HttpPost]
        [Route("GetAllCountries")]
        public List<Country> GetAllCountries()
        {
            return _userService.GetCountries();
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

        [HttpGet]
        [Route("GetMarketingInfoByOwnerId/{ownerid}")]
        public MarketingInfo GetMarketingInfoByOwnerId(long ownerid)
        {
            return _marketingInfoService.GetMarketingInfoByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetAdditionalInfoByOwnerId/{ownerid}")]
        public AdditionalInfo GetAdditionalInfoByOwnerId(long ownerid)
        {
            return _additionalInfoeService.GetAdditionalInfoByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetEmailByOwnerId/{ownerid}")]
        public Email GetEmailByOwnerId(long ownerid)
        {
            return _emailService.GetEmailByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetShortMessageByOwnerId/{ownerid}")]
        public ShortMessage GetShortMessageByOwnerId(long ownerid)
        {
            return _shortMeassageService.GetShortMessageByOwnerId(ownerid);
        }

        [HttpGet]
        [Route("GetUserDetailByOwnerId/{ownerid}")]
        public User GetUserDetailByOwnerId(long ownerid)
        {
            return _userService.GetUserDetailByOwnerId(ownerid);
        }

        [HttpPost]
        [Route("InsertMarketingInfo")]
        public MarketingInfo InsertMarketingInfo(MarketingInfo marketingVM)
        {
            if (marketingVM != null)
                return _marketingInfoService.InsertMarketingInfo(marketingVM);
            else
                return null;
        }

        [HttpPost]
        [Route("InsertAdditionalInfo")]
        public AdditionalInfo InsertAdditionalInfo(AdditionalInfo additionalVM)
        {
            if (additionalVM != null)
                return _additionalInfoeService.InsertAdditionalInfo(additionalVM);
            else
                return null;
        }

        [HttpGet]
        [Route("GetLeadStatusList")]
        public List<UserResponseStatus> GetLeadStatusList()
        {
            return _userService.GetLeadStatusList();
        }

        [HttpPost]
        [Route("GetTradeAccountByType")]
        public List<User> GetTradeAccountByType(TradeAccountVM tradevm)
        {
            return _userService.GetTradeAccountByType(tradevm);
        }

        [HttpPost]
        [Route("ForgotPassword")]
        public string ForgotPassword(string username)
        {
            try
            {
                User user = _userService.GetUserbyusername(username);
                if (user == null)
                {
                    return "Invalid User";
                }
                string content = "<html><body><p>Dear <b></b></p>";
                content += "<p>Below is your  credentials of SitCom  :</p>";
                content += "<p>Login ID: " + username + "</p>";
                content += "<p>Password: " + user.Password + "</p>";
                content += "<p>Happy Trading !</p>";
                content += "<p>SitCom Team</p></body></html>";
                MailManager oMailManager = new MailManager
                {
                    To = user.Email,
                    Subject = "Forgot Password - SitCom!",
                    IsBodyHtml = true,
                    Body = content
                };
                oMailManager.SendEmail();
                return "Success";
            }
            catch (Exception)
            {
                return "Failure";
            }
        }
    }
}
