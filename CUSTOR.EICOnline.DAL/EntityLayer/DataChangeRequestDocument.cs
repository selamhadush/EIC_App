﻿using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class DataChangeRequestDocument
  {
    public int DataChangeRequestDocumentId { get; set; }
    public int DataChangeRequestId { get; set; }
    public int DocumentId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public DataChangeRequest DataChangeRequest { get; set; }
    public Document Document { get; set; }
  }
}