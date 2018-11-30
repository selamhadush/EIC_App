using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Associate
  {
    public Associate()
    {
      ProjectAssociate = new HashSet<ProjectAssociate>();
    }

    public int AssociateId { get; set; }
    public string Tin { get; set; }
    public int Title { get; set; }
    public int InvestorId { get; set; }
    public string FirstName { get; set; }
    public string FirstNameSort { get; set; }
    public string FirstNameSoundx { get; set; }
    public string FirstNameEng { get; set; }
    public string FatherName { get; set; }
    public string FatherNameSort { get; set; }
    public string FatherNameSoundx { get; set; }
    public string FatherNameEng { get; set; }
    public string GrandName { get; set; }
    public string GrandNameSort { get; set; }
    public string GrandNameSoundx { get; set; }
    public string GrandNameEng { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Gender { get; set; }
    public int Nationality { get; set; }
    public int Origin { get; set; }
    public byte[] Photo { get; set; }
    public string Remark { get; set; }
    public int? AddressId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }
        public string RegionId { get; set; }
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
        public Address Address { get; set; }
    public Investor Investor { get; set; }
    public ICollection<ProjectAssociate> ProjectAssociate { get; set; }
  }

    public partial class AssociateDTO
    {
        public AssociateDTO()
        {
             
        }

        public int AssociateId { get; set; }
        public string Tin { get; set; }
        public int Title { get; set; }
        public int InvestorId { get; set; }
        public string FirstName { get; set; }
        
        public string FirstNameEng { get; set; }
        public string FatherName { get; set; }
       
        public string FatherNameEng { get; set; }
        public string GrandName { get; set; }
       
        public string GrandNameEng { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Gender { get; set; }
        public int Nationality { get; set; }
        public int Origin { get; set; }
         public int? AddressId { get; set; }
        public bool? IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string PhotoData { get; set;}
        public string RegionId { get; set; }
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
    }

    public static class EntityExtension
    {
        public static Associate GetAssociate(this AssociateDTO associateDTO)
        {
            return new Associate
            {
                AddressId = associateDTO.AddressId,
                AssociateId = associateDTO.AssociateId,
                DateOfBirth = associateDTO.DateOfBirth,
                FatherName = associateDTO.FatherName,
                FatherNameEng = associateDTO.FatherNameEng,
                FatherNameSort = string.Empty,
                FatherNameSoundx = string.Empty,
                FirstName = associateDTO.FirstName,
                FirstNameEng = associateDTO.FirstNameEng,
                FirstNameSort = string.Empty,
                FirstNameSoundx = string.Empty,
                Gender = associateDTO.Gender,
                GrandName = associateDTO.GrandName,
                GrandNameEng = associateDTO.GrandNameEng,
                GrandNameSort = string.Empty,
                GrandNameSoundx = string.Empty,
                InvestorId = associateDTO.InvestorId,
                IsActive = associateDTO.IsActive,
                IsDeleted = associateDTO.IsDeleted,
                Nationality = associateDTO.Nationality,
                Origin = associateDTO.Origin,
                Remark = string.Empty,
                Title = associateDTO.Title,
                Tin = associateDTO.Tin,
                UpdatedUserName = string.Empty,
                RegionId = associateDTO.RegionId,
                ZoneId = associateDTO.ZoneId,
                WoredaId = associateDTO.WoredaId,
                KebeleId = associateDTO.KebeleId,
                HouseNo = associateDTO.HouseNo,
                CellPhoneNo = associateDTO.CellPhoneNo,
                Email = associateDTO.Email,
                Fax = associateDTO.Fax,
                Pobox = associateDTO.Pobox,
                TeleNo = associateDTO.TeleNo,
                OtherAddress = associateDTO.OtherAddress
            };
        }
    }
}