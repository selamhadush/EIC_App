using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Address
  {
    public Address()
    {
      Associate = new HashSet<Associate>();
      //Investor = new HashSet<Investor>();
    }

    public int AddressId { get; set; }
    public int ParentId { get; set; }
    public int AddressType { get; set; }
    public bool IsMainOffice { get; set; }
    public string SpecificAreaName { get; set; }
    public string RegionId { get; set; }
    public string TownId { get; set; }
    public string ZoneId { get; set; }
    public string WoredaId { get; set; }
    public string KebeleId { get; set; }
    public string HouseNo { get; set; }
    public string TeleNo { get; set; }
    public string Pobox { get; set; }
    public string Fax { get; set; }
    public string CellPhoneNo { get; set; }
    public string Email { get; set; }
    public string OtherAddress { get; set; }

    public bool? IsIndustrialPark { get; set; }
    public int? IndustrialParkId { get; set; }


    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Kebele Kebele { get; set; }
    public Region Region { get; set; }
    public Town Town { get; set; }
    public Woreda Woreda { get; set; }
    public Zone Zone { get; set; }
    public ICollection<Associate> Associate { get; set; }
    //public ICollection<Investor> Investor { get; set; }
  }
}