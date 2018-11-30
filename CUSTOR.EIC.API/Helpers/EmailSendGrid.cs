using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EICOnline.Helpers
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }

    public class EmailSendGrid : IEmailSender
    {
        public IConfiguration Config;

        public EmailSendGrid(IConfiguration config)
        {
            Config = config;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            var apiKey = Config["SendGridKey"];
            return Execute(apiKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var emailSenderAddress = Config["EmailSenderAddress"];
            var emailSenderName = Config["EmailSenderName"];
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage
            {
                From = new EmailAddress(emailSenderAddress, emailSenderName),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));

            msg.TrackingSettings = new TrackingSettings
            {
                ClickTracking = new ClickTracking {Enable = false}
            };

            return client.SendEmailAsync(msg);
        }
    }
}