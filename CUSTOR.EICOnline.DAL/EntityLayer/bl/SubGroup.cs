using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CUSTOR.EICOnline.DAL.EntityLayer.bl
{
    public class SubGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public string EnglishDescription { get; set; }
        public string SubGroupTigrigna { get; set; }
        public string SubGroupAfanOromo { get; set; }
        public string SubGroupAfar { get; set; }
        public string SubGroupSomali { get; set; }
        public string SubGroupArabic { get; set; }
        public string DescriptionSort { get; set; }
        public string DescriptionSoundX { get; set; }
        public int Code { get; set; }

        public int Parent { get; set; }
    }
}
