using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
    public class BlRegistration : AuditableEntity
    {
      
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string organization_name { get; set; }
        public string Mowner_name { get; set; }
        public string owner_namebl { get; set; }
        public DateTime dateE { get; set; }
        public long? licensenumber { get; set; }
        public string status { get; set; }
        public string capital { get; set; }
        public bool? isexist { get; set; }
        public long? licensenumber_old { get; set; }
        public DateTime dateofissue { get; set; }
        public string MajorDivision { get; set; }
        public string Division { get; set; }
        public string MajorGroup { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
    }
}
