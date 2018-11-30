using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CUSTOR.EICOnline.DAL.EntityLayer.bl
{
    public class Group
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public string EnglishDescription { get; set; }
        public string GroupTigrigna { get; set; }
        public string GroupAfanOromo { get; set; }
        public string GroupAfar { get; set; }
        public string GroupSomali { get; set; }
        public string GroupArabic { get; set; }
        public string DescriptionSort { get; set; }
        public string DescriptionSoundX { get; set; }
        public int Code { get; set; }

        public int Parent { get; set; }
    }
}
