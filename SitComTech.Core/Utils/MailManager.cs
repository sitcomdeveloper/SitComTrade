using System;
using System.IO;
using System.Collections.Generic;
using SitComTech.Model.Common;
using System.Linq;
using SitComTech.Model.ViewModel;
using System.Net;
using SitComTech.Model.DataObject;
using System.Configuration;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace SitComTech.Core.Utils
{
    public class MailManager
    {
        #region Public Properties
        public string To { get; set; }
        
        public List<string> ToEmails { get; set; }

        public List<string> CCEmails { get; set; }

        public List<string> BccEmail { get; set; }       

        public string From { get; set; }

        public string FromDisplayName { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public bool IsBodyHtml { get; set; }

        #endregion

        public void SendEmail()
        {
            try
            {
                string smtpAddress = "smtp.gmail.com";
                int portNumber = 587;
                bool enableSSL = true;
                string emailFromAddress = "rksingh01072001@gmail.com";
                string password = "ramjisingh";
                using (MailMessage mail = new MailMessage())
                    {
                        mail.From = new MailAddress(emailFromAddress);
                        mail.To.Add(this.To);
                        mail.Subject = this.Subject;
                        mail.Body = this.Body;
                        mail.IsBodyHtml = true;
                        using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                        {
                            smtp.UseDefaultCredentials = false;
                            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                            smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                            smtp.EnableSsl = enableSSL;
                            smtp.Send(mail);
                        }
                    }
                

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
