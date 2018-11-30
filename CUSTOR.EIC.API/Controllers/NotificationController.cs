using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using CUSTOR.EICOnline.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Notification")]
    public class NotificationController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> SetNotificationAsync()
        {
            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", // set your SMTP server name here
                Port = 587, // Port
                EnableSsl = true,
                Credentials = new NetworkCredential("addisalem12@gmail.com", "kataAddis1/Dev")
            };

            using (var message = new MailMessage("addisalem12@gmail.com", "addisalem12@gmail.com")
            {
                Subject = "Subject",
                Body = "Body"
            })
            {
                await smtpClient.SendMailAsync(message);
            }

            return Ok("success");
        }

        [HttpPost]
        public async Task<IActionResult> PostNotification([FromBody] Notification Notification)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}
            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", // set your SMTP server name here
                Port = 587, // Port
                EnableSsl = true,
                Credentials = new NetworkCredential("addisalem12@gmail.com", "kataAddis1/Dev")
            };

            using (var message = new MailMessage(Notification.From, Notification.To)
            {
                Subject = "EIC Notification",
                Body = Notification.Message
            })
            {
                await smtpClient.SendMailAsync(message);
            }

            return CreatedAtAction("SetNotificationAsync", new {id = Notification.NotificationId}, Notification);
        }
    }
}