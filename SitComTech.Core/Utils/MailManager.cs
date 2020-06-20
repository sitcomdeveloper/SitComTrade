using SitComTech.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

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
        public List<ListItem> Attachments { get; set; }
        public bool IsBodyHtml { get; set; }
        string smtpAddress = "smtpout.secureserver.net";
        int portNumber = 80;
        bool enableSSL = true;
        string emailFromAddress = "support@topseedtech.in";
        string password = "P@ssW$rd2020";

        #endregion

        public void SendEmail()
        {
            try
            {
               
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
        public  void SendEmail(MailManager mailManager)
        {
            try
            {                
                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                mail.Subject = mailManager.Subject;
                mail.Body = mailManager.Body;
                mail.IsBodyHtml = true;
                mail.From = new MailAddress(emailFromAddress);

                if (!String.IsNullOrWhiteSpace(mailManager.To))
                {
                    mail.To.Add(new MailAddress(mailManager.To));
                }

                if (mailManager.ToEmails != null)
                {
                    foreach (string address in mailManager.ToEmails)
                    {
                        if (!string.IsNullOrEmpty(address))
                            mail.To.Add(new MailAddress(address));
                    }
                }

                if (mailManager.CCEmails != null)
                {

                    foreach (string address in mailManager.CCEmails)
                    {
                        if (!string.IsNullOrEmpty(address))
                            mail.CC.Add(new MailAddress(address));

                    }
                }

                if (mailManager.BccEmail != null)
                {

                    foreach (string address in mailManager.BccEmail)
                    {
                        if (!string.IsNullOrEmpty(address))
                            mail.Bcc.Add(new MailAddress(address));
                    }
                }

                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    smtp.UseDefaultCredentials = false;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                    smtp.EnableSsl = enableSSL;
                    smtp.Send(mail);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
