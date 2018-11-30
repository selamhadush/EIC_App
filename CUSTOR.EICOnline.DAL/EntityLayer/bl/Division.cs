using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CUSTOR.EICOnline.DAL.EntityLayer.bl
{
  public class Division
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public string EnglishDescription { get; set; }
        public string DivisionTigrigna { get; set; }
        public string DivisionAfanOromo { get; set; }
        public string DivisionAfar { get; set; }
        public string DivisionSomali { get; set; }
        public string DivisionArabic { get; set; }
        public string DescriptionSort { get; set; }
        public string DescriptionSoundX { get; set; }
        public int Code { get; set; }

        public int Parent { get; set; }
    }
}
