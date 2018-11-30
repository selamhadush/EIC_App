using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CUSTOR.EICOnline.DAL.EntityLayer.bl
{
    public class MajorGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public string EnglishDescription { get; set; }
        public string MajorGroupTigrigna { get; set; }
        public string MajorGroupAfanOromo { get; set; }
        public string MajorGroupAfar { get; set; }
        public string MajorGroupSomali { get; set; }
        public string MajorGroupArabic { get; set; }
        public string DescriptionSort { get; set; }
        public string DescriptionSoundX { get; set; }
        public int Code { get; set; }

        public int Parent { get; set; }
    }
}
