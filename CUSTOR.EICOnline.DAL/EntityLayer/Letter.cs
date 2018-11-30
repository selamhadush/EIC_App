using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
    public class Letter
    {
        public int LetterId { get; set; }
        public int ProjectId { get; set; }
        public string LetterType { get; set; }
        public DateTime? RequestDate { get; set; }
        public string LetterNo { get; set; }
        public string LetterContent { get; set; }        
    }
}
