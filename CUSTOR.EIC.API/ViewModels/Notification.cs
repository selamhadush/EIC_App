namespace CUSTOR.EICOnline.API.ViewModels
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Message { get; set; }
        public string InvestorId { get; set; }
    }
}