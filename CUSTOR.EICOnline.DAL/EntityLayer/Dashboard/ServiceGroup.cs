using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class series
  {

    //public int total { get; set; }
    public string name { get; set; }
    public int? value { get; set; }


  }

  public class ServiceGroup
  {

    public string name { get; set; }

    public IEnumerable<series> series { get; set; }


  }
}
