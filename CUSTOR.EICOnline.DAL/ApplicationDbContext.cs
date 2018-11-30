using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.AllAddress;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.business;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using CUSTOR.Security;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CUSTOR.EICOnline.DAL.EntityLayer.bl;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string ConnectionString { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            CurrentUserId = "5926fc5c-7c25-48d5-878d-79e35ba2f8d1"; //for now
        }

        public string CurrentUserId { get; set; }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Investor> Investors { get; set; }
        public DbSet<CompanyClearance> CompanyClearances { get; set; }
        public DbSet<Lookups> Lookup { get; set; }
       
        public virtual DbSet<Address> Address { get; set; }

        public virtual DbSet<Associate> Associate { get; set; }
        public virtual DbSet<Caption> Caption { get; set; }
        public virtual DbSet<DataChangeRequest> DataChangeRequest { get; set; }
        public virtual DbSet<DataChangeRequestDocument> DataChangeRequestDocument { get; set; }
        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<DocumentVersion> DocumentVersion { get; set; }
        public virtual DbSet<IncentiveItem> IncentiveItem { get; set; }
        public virtual DbSet<IncentiveRequest> IncentiveRequest { get; set; }
        public virtual DbSet<IncentiveRequestDocument> IncentiveRequestDocument { get; set; }
        public virtual DbSet<IncentiveRequestItem> IncentiveRequestItem { get; set; }
        public virtual DbSet<IncentiveRequestItemReconciliation> IncentiveRequestItemReconciliation { get; set; }

        public virtual DbSet<LetterTemplate> LetterTemplate { get; set; }
        public virtual DbSet<LetterTemplateValue> LetterTemplateValue { get; set; }
        public virtual DbSet<Log> Log { get; set; }
        public virtual DbSet<LookupType> LookupType { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectAssociate> ProjectAssociate { get; set; }
        public virtual DbSet<ProjectCancellation> ProjectCancellation { get; set; }
        public virtual DbSet<ProjectSubstitute> ProjectSubstitute { get; set; }
        public virtual DbSet<ProjectCost> ProjectCost { get; set; }
        public virtual DbSet<ProjectEmployment> ProjectEmployment { get; set; }
        public virtual DbSet<ProjectImplementationPlan> ProjectImplementationPlan { get; set; }
        public virtual DbSet<ProjectInjunction> ProjectInjunction { get; set; }
        public virtual DbSet<ProjectInput> ProjectInput { get; set; }
        public virtual DbSet<ProjectNationalityComposition> ProjectNationalityComposition { get; set; }
        public virtual DbSet<ProjectOutput> ProjectOutput { get; set; }
        public virtual DbSet<ProjectRenewal> ProjectRenewal { get; set; }
        public virtual DbSet<ProjectRequirement> ProjectRequirement { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Nationality> Nationality { get; set; }
        public virtual DbSet<RoleClaim> RoleClaim { get; set; }
        public virtual DbSet<ServiceApplication> ServiceApplication { get; set; }

        //public virtual DbSet<ServiceApplicationWorkflow> ServiceApplicationWorkflow { get; set; }
        public virtual DbSet<ServiceOutput> ServiceOutput { get; set; }

        public virtual DbSet<ServiceSite> ServiceSite { get; set; }
        public virtual DbSet<ServiceStep> ServiceStep { get; set; }
        public virtual DbSet<ServiceWorkflow> ServiceWorkflow { get; set; }
        public virtual DbSet<ServiceWorkflowHistory> ServiceWorkflowHistories { get; set; }
        public virtual DbSet<ServiceWorkflowInputDocument> ServiceWorkflowInputDocument { get; set; }
        public virtual DbSet<ServiceWorkflowOutputDocument> ServiceWorkflowOutputDocument { get; set; }
        public virtual DbSet<Site> Site { get; set; }
        public virtual DbSet<Town> Town { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserClaim> UserClaim { get; set; }
        public virtual DbSet<UserLogin> UserLogin { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<UserToken> UserToken { get; set; }
        public virtual DbSet<Validation> Validation { get; set; }
        public DbSet<ServicePrerequisite> ServicePrerequisite { get; set; }
        public DbSet<Lookup> Lookups { get; set; }
        public DbSet<Region> Regions { get; set; }

        public DbSet<Zone> Zones { get; set; }
        public DbSet<Woreda> Woredas { get; set; }
        public DbSet<Kebele> Kebeles { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<Tariff> Tariff { get; set; }
        public DbSet<ServiceTariff> ServiceTariff { get; set; }
        public DbSet<Sector> Sector { get; set; }
        public DbSet<SubSector> SubSector { get; set; }
        public DbSet<Activity> Activity { get; set; }
        public DbSet<InvestmentActivity> InvestmentActivity { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<TodoTask> TodoTask { get; set; }
        public DbSet<IncentiveLog> IncentiveLogs { get; set; }
        public DbSet<Squence> Squences { get; set; }
        public DbSet<IncentiveBoMRequestItem> IncentiveBoMRequestItem { get; set; }
        public DbSet<IncentiveTaxExemptionRequest> IncentiveTaxExemptionRequest { get; set; }
        public DbSet<ApplicationSetting> ApplicationSetting { get; set; }
        public DbSet<ProjectStatusHistory> ProjectStatusHistory { get; set; }
        public DbSet<Letter> Letter { get; set; }
        public DbSet<IncentiveRequestDetail> IncentiveRequestDetail { get; set; }
        public DbSet<CapitalRegistration> CapitalRegistrations { get; set; }
        public DbSet<CompanyName> CompanyNames { get; set; }

        public DbSet<BlRegistration> BlRegistration { get; set; }
        public DbSet<Division> Division { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<MajorDivision> MajorDivision { get; set; }
        public DbSet<MajorGroup> MajorGroup { get; set; }
        public DbSet<SubGroup> SubGroup { get; set; }

        public DbQuery<series> series { get; set; }
        public DbQuery<IncentiveDetailDto> IncentiveDetailDto { get; set; }
       

        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //  if (!optionsBuilder.IsConfigured)
        //  {
        //    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //    optionsBuilder.UseSqlServer(@"server=LAPTOP-ANIV3T71;Initial Catalog=EIC;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        //  }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Address>(entity =>
              {
                  entity.ToTable("Address", "dbo");

                  entity.HasIndex(e => e.KebeleId);

                  entity.HasIndex(e => e.RegionId);

                  entity.HasIndex(e => e.TownId);

                  entity.HasIndex(e => e.WoredaId);

                  entity.HasIndex(e => e.ZoneId);

                  entity.Property(e => e.CellPhoneNo).HasMaxLength(50);

                  entity.Property(e => e.Email).HasMaxLength(50);

                  entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                  entity.Property(e => e.Fax).HasMaxLength(50);

                  entity.Property(e => e.HouseNo).HasMaxLength(50);

                  entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                  entity.Property(e => e.KebeleId).HasMaxLength(50);

                  entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                  entity.Property(e => e.OtherAddress).HasMaxLength(1000);

                  entity.Property(e => e.Pobox).HasMaxLength(50);

                  entity.Property(e => e.RegionId).HasMaxLength(50);

                  entity.Property(e => e.Remark).HasMaxLength(1000);

                  entity.Property(e => e.SpecificAreaName).HasMaxLength(250);

                  entity.Property(e => e.TeleNo).HasMaxLength(50);

                  entity.Property(e => e.TownId).HasMaxLength(50);

                  entity.Property(e => e.WoredaId).HasMaxLength(50);

                  entity.Property(e => e.ZoneId).HasMaxLength(50);

            //entity.HasOne(d => d.Kebele)
            //          .WithMany(p => p.Address)
            //          .HasForeignKey(d => d.KebeleId);

            //entity.HasOne(d => d.Region)
            //          .WithMany(p => p.Address)
            //          .HasForeignKey(d => d.RegionId);

            //entity.HasOne(d => d.Town)
            //          .WithMany(p => p.Address)
            //          .HasForeignKey(d => d.TownId);

            //entity.HasOne(d => d.Woreda)
            //          .WithMany(p => p.Address)
            //          .HasForeignKey(d => d.WoredaId);

            //entity.HasOne(d => d.Zone)
            //          .WithMany(p => p.Address)
            //          .HasForeignKey(d => d.ZoneId);
        });
            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test", "dbo");
            });

            modelBuilder.Entity<CapitalRegistration>(entity =>
            {
                entity.ToTable("CapitalRegistration", "dbo");
            }); 

            modelBuilder.Entity<Letter>(entity =>
            {
                entity.ToTable("Letter", "dbo");
            });
            modelBuilder.Entity<CompanyName>(entity =>
            {
                entity.ToTable("CompanyName", "dbo");
            });
            modelBuilder.Entity<IncentiveRequestDetail>(entity =>
            {
                entity.ToTable("IncentiveRequestDetail", "dbo");
            });
            
            modelBuilder.Entity<ProjectStatusHistory>(entity =>
            {
                entity.ToTable("ProjectStatusHistory", "dbo");
            });


            modelBuilder.Entity<CompanyClearance>(entity =>
            {
                entity.ToTable("CompanyClearance", "dbo");
            });


            modelBuilder.Entity<IncentiveTaxExemptionRequest
      >(entity =>
            {
                entity.ToTable("Incentive_TaxExemptionRequest", "dbo");
            });
            modelBuilder.Entity<Squence>(entity =>
            {
                entity.ToTable("Squence", "dbo");
            });
            modelBuilder.Entity<ApplicationSetting>(entity =>
            {
                entity.ToTable("ApplicationSetting", "dbo");
            });
            modelBuilder.Entity<IncentiveBoMRequestItem>(entity =>
            {
                entity.ToTable("IncentiveBoMRequestItem", "dbo");
            });

            modelBuilder.Entity<ProjectSubstitute>(entity =>
            {
                entity.ToTable("ProjectSubstitute", "dbo");
            });
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("Notification", "dbo");
            });
            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.ToTable("TodoTask", "dbo");
            });
            modelBuilder.Entity<Associate>(entity =>
            {
                entity.ToTable("Associate", "dbo");

                entity.HasIndex(e => e.AddressId);

                entity.HasIndex(e => e.InvestorId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FatherName).HasMaxLength(50);

                entity.Property(e => e.FatherNameEng).HasMaxLength(50);

                entity.Property(e => e.FatherNameSort).HasMaxLength(100);

                entity.Property(e => e.FatherNameSoundx).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.FirstNameEng).HasMaxLength(50);

                entity.Property(e => e.FirstNameSort).HasMaxLength(100);

                entity.Property(e => e.FirstNameSoundx).HasMaxLength(100);

                entity.Property(e => e.GrandName).HasMaxLength(50);

                entity.Property(e => e.GrandNameEng).HasMaxLength(50);

                entity.Property(e => e.GrandNameSort).HasMaxLength(100);

                entity.Property(e => e.GrandNameSoundx).HasMaxLength(100);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(100);

                entity.Property(e => e.Tin).HasMaxLength(100);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Associate)
                    .HasForeignKey(d => d.AddressId);

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.Associate)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Caption>(entity =>
            {
                entity.Property(e => e.AfanOromo).HasMaxLength(250);

                entity.Property(e => e.Afar).HasMaxLength(250);

                entity.Property(e => e.Amharic)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Arabic).HasMaxLength(250);

                entity.Property(e => e.ControlName).HasMaxLength(250);

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.English)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FormName).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Somali).HasMaxLength(250);

                entity.Property(e => e.Tigrigna).HasMaxLength(250);
            });

            modelBuilder.Entity<DataChangeRequest>(entity =>
            {
                entity.ToTable("DataChangeRequest", "dbo");

                entity.HasIndex(e => e.ChangeTypeId);

                entity.HasIndex(e => e.ServiceApplicationId);

                entity.Property(e => e.ChangeFrom)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.ChangeTo)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.ChangeType)
          //          .WithMany(p => p.DataChangeRequest)
          //          .HasForeignKey(d => d.ChangeTypeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.ServiceApplication)
                    .WithMany(p => p.DataChangeRequest)
                    .HasForeignKey(d => d.ServiceApplicationId)
                     .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<DataChangeRequestDocument>(entity =>
            {
                entity.ToTable("DataChangeRequestDocument", "dbo");

                entity.HasIndex(e => e.DataChangeRequestId);

                entity.HasIndex(e => e.DocumentId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.DataChangeRequest)
                    .WithMany(p => p.DataChangeRequestDocument)
                    .HasForeignKey(d => d.DataChangeRequestId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.DataChangeRequestDocument)
                    .HasForeignKey(d => d.DocumentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.ToTable("Document", "dbo");

          //entity.HasIndex(e => e.DocumentTypeId);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.KeyWords).HasMaxLength(1000);

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.Property(e => e.Title).HasMaxLength(250);
      });

            modelBuilder.Entity<DocumentVersion>(entity =>
            {
                entity.ToTable("DocumentVersion", "dbo");

                entity.HasIndex(e => e.DocumentId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FileName).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Title).HasMaxLength(250);

                entity.Property(e => e.Url).HasMaxLength(250);
            });

            modelBuilder.Entity<IncentiveItem>(entity =>
            {
                entity.ToTable("IncentiveItem", "dbo");

                entity.HasIndex(e => e.ItemCategoryId);

                entity.HasIndex(e => e.UnitId);

                entity.Property(e => e.DescriptionAmharic).HasMaxLength(1000);

                entity.Property(e => e.DescriptionEnglish).HasMaxLength(1000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Hscode).HasColumnName("HSCode");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.ItemCategory)
          //          .WithMany(p => p.IncentiveItemItemCategory)
          //          .HasForeignKey(d => d.ItemCategoryId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.Unit)
          //          .WithMany(p => p.IncentiveItemUnit)
          //          .HasForeignKey(d => d.UnitId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<IncentiveRequest>(entity =>
            {
                entity.ToTable("IncentiveRequest", "dbo");

                entity.HasIndex(e => e.CustomsSiteId);

                entity.HasIndex(e => e.RequestTypeId);

                entity.HasIndex(e => e.ServiceApplicationId);



                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.RequestDate).HasColumnType("date");

          //entity.HasOne(d => d.CustomsSite)
          //          .WithMany(p => p.IncentiveRequestCustomsSite)
          //          .HasForeignKey(d => d.CustomsSiteId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.RequestType)
          //          .WithMany(p => p.IncentiveRequestRequestType)
          //          .HasForeignKey(d => d.RequestTypeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.ServiceApplication)
                    .WithMany(p => p.IncentiveRequest)
                    .HasForeignKey(d => d.ServiceApplicationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<IncentiveRequestDocument>(entity =>
            {
                entity.ToTable("IncentiveRequestDocument", "dbo");

                entity.HasIndex(e => e.DocumentId);

                entity.HasIndex(e => e.DocumentTypeId);

                entity.HasIndex(e => e.IncentiveRequestId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.Title).HasMaxLength(250);

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.IncentiveRequestDocument)
                    .HasForeignKey(d => d.DocumentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.DocumentType)
          //          .WithMany(p => p.IncentiveRequestDocument)
          //          .HasForeignKey(d => d.DocumentTypeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.IncentiveRequest)
          //          .WithMany(p => p.IncentiveRequestDocument)
          //          .HasForeignKey(d => d.IncentiveRequestId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<IncentiveRequestItem>(entity =>
            {
                entity.ToTable("Incentive_RequestItem", "dbo");



          //entity.HasOne(d => d.Unit)
          //          .WithMany(p => p.IncentiveRequestItemUnit)
          //          .HasForeignKey(d => d.UnitId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<IncentiveRequestItemReconciliation>(entity =>
            {
                entity.ToTable("IncentiveRequestItemReconciliation", "dbo");

                entity.HasIndex(e => e.RequestItemId);

                entity.HasIndex(e => e.UnitId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ImportedDate).HasColumnType("date");

                entity.Property(e => e.InvoiceNo).HasMaxLength(50);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);


          //entity.HasOne(d => d.Unit)
          //          .WithMany(p => p.IncentiveRequestItemReconciliation)
          //          .HasForeignKey(d => d.UnitId);
      });

            modelBuilder.Entity<Investor>(entity =>
            {
                entity.ToTable("Investor", "dbo");

          ////entity.HasIndex(e => e.AddressId);

          //entity.HasIndex(e => e.SiteId);

          ////entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.FatherName).HasMaxLength(50);

          //entity.Property(e => e.FatherNameEng).HasMaxLength(50);

          //entity.Property(e => e.FatherNameSort).HasMaxLength(100);

          //entity.Property(e => e.FatherNameSoundx).HasMaxLength(100);

          //entity.Property(e => e.FirstName).HasMaxLength(50);

          //entity.Property(e => e.FirstNameEng).HasMaxLength(50);

          //entity.Property(e => e.FirstNameSort).HasMaxLength(100);

          //entity.Property(e => e.FirstNameSoundx).HasMaxLength(100);

          //entity.Property(e => e.GrandName).HasMaxLength(50);

          //entity.Property(e => e.GrandNameEng).HasMaxLength(50);

          //entity.Property(e => e.GrandNameSort).HasMaxLength(100);

          //entity.Property(e => e.GrandNameSoundx).HasMaxLength(100);

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.Property(e => e.RegistrationNumber).HasMaxLength(250);

          ////entity.Property(e => e.Remark).HasMaxLength(1000);

          //entity.Property(e => e.TradeName).HasMaxLength(250);

          //entity.Property(e => e.TradeNameEnglish).HasMaxLength(250);

          //entity.Property(e => e.TradeNameSort).HasMaxLength(250);

          //entity.Property(e => e.TradeNameSoundX).HasMaxLength(250);

          //entity.HasOne(d => d.Address)
          //          .WithMany(p => p.Investor)
          //          .HasForeignKey(d => d.AddressId);

          //entity.HasOne(d => d.Site)
          //          .WithMany(p => p.Investor)
          //          .HasForeignKey(d => d.SiteId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<Kebele>(entity =>
            {
                entity.ToTable("Kebeles", "dbo");

                entity.HasIndex(e => e.WoredaId);

                entity.Property(e => e.KebeleId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          entity.Property(e => e.WoredaId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Woreda)
                    .WithMany(p => p.Kebeles)
                    .HasForeignKey(d => d.WoredaId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<LetterTemplate>(entity =>
            {
                entity.ToTable("LetterTemplate", "dbo");

            });

            modelBuilder.Entity<LetterTemplateValue>(entity =>
            {
                entity.ToTable("LetterTemplateValue", "dbo");

                entity.HasIndex(e => e.LetterTemplateId);

                entity.Property(e => e.ColumnName).HasMaxLength(100);

                entity.Property(e => e.CriteriaColumnName).HasMaxLength(100);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.TableName).HasMaxLength(100);

                entity.Property(e => e.Tag).HasMaxLength(250);


            });

            modelBuilder.Entity<Log>(entity =>
            {
                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Level).HasMaxLength(50);

                entity.Property(e => e.MachineName).HasMaxLength(250);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");
            });

            //modelBuilder.Entity<Lookup>(entity =>
            //{
            //  entity.HasIndex(e => e.ParentLookupId);

            //  entity.Property(e => e.AfanOromo).HasMaxLength(250);

            //  entity.Property(e => e.Afar).HasMaxLength(250);

            //  entity.Property(e => e.Amharic)
            //            .IsRequired()
            //            .HasMaxLength(250);

            //  entity.Property(e => e.Arabic).HasMaxLength(250);

            //  entity.Property(e => e.Code)
            //            .IsRequired()
            //            .HasMaxLength(250);

            //  entity.Property(e => e.Description).HasMaxLength(250);

            //  entity.Property(e => e.English)
            //            .IsRequired()
            //            .HasMaxLength(250);

            //  entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

            //  entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

            //  entity.Property(e => e.LookupTypeCode)
            //            .IsRequired()
            //            .HasMaxLength(250);

            //  entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

            //  entity.Property(e => e.Somali).HasMaxLength(250);

            //  entity.Property(e => e.SortX).HasMaxLength(250);

            //  entity.Property(e => e.SoundX).HasMaxLength(250);

            //  entity.Property(e => e.Tigrigna).HasMaxLength(250);

            //  entity.HasOne(d => d.ParentLookup)
            //            .WithMany(p => p.InverseParentLookup)
            //            .HasForeignKey(d => d.ParentLookupId);
            //});

            modelBuilder.Entity<LookupType>(entity =>
            {
                entity.ToTable("LookUpType", "dbo");

            });
            modelBuilder.Entity<IncentiveLog>(entity =>
            {
                entity.ToTable("IncentiveLog", "dbo");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order", "dbo");

          //entity.HasIndex(e => e.PaymentTypeId);

          //entity.HasIndex(e => e.ServiceApplicationId);

          //entity.Property(e => e.CashierUserName).HasMaxLength(100);

          //entity.Property(e => e.CheckNo).HasMaxLength(50);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.Property(e => e.OrderDate).HasColumnType("date");

          //entity.Property(e => e.PaymentDate).HasColumnType("date");

          //entity.Property(e => e.PreparedByUserName).HasMaxLength(100);

          //entity.Property(e => e.ReceiptNumber)
          //          .IsRequired()
          //          .HasMaxLength(50);

          //entity.Property(e => e.Remark).HasMaxLength(1000);

          //entity.Property(e => e.VoidByUserName).HasMaxLength(100);

          //entity.Property(e => e.VoidDate).HasColumnType("date");

          //entity.Property(e => e.VoidReason).HasMaxLength(1000);

          //entity.HasOne(d => d.PaymentType)

          //          .WithMany(p => p.OrderNavigation)
          //          .HasForeignKey(d => d.PaymentTypeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.ServiceApplication)
          //          .WithMany(p => p.Order)
          //          .HasForeignKey(d => d.ServiceApplicationId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.ToTable("OrderDetail", "dbo");

          //entity.HasIndex(e => e.OrderId);

          //entity.HasIndex(e => e.TariffId);

          ////entity.Property(e => e.AccCode)
          //          .IsRequired()
          //          .HasMaxLength(50);

          entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.Order)
          //          .WithMany(p => p.OrderDetail)
          //          .HasForeignKey(d => d.OrderId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.Tariff)
          //          .WithMany(p => p.OrderDet)
          //          .HasForeignKey(d => d.TariffId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.ToTable("Activity", "dbo");

          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });
            modelBuilder.Entity<InvestmentActivity>(entity =>
            {
                entity.ToTable("InvestmentActivity", "dbo");

          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Project", "dbo");

                entity.HasIndex(e => e.InvestorId);

          //entity.HasIndex(e => e.ActivityId);

          entity.HasIndex(e => e.SiteId);

          //entity.HasIndex(e => e.InvestmentActivity);

          entity.Property(e => e.BusinessLicenseNo).HasMaxLength(50);

                entity.Property(e => e.EnvironmentalImpact).HasMaxLength(4000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InvestmentPermitNo).HasMaxLength(50);

                entity.Property(e => e.InvestmentPermitNoSort).HasMaxLength(500);

                entity.Property(e => e.InvestmentPermitNoSoundX).HasMaxLength(500);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.PreviousInvestmentPermitNo).HasMaxLength(4000);

                entity.Property(e => e.ProjectDescription).HasMaxLength(4000);

                entity.Property(e => e.ProjectName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ProjectNameSort)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.ProjectNameSoundX)
                    .IsRequired()
                    .HasMaxLength(500);

          //entity.Property(e => e.ActivityId).HasMaxLength(50);

          //entity.Property(e => e.InvestmentActivityId).HasMaxLength(50);

          //entity.HasOne(d => d.Investor)
          //          .WithMany(p => p.Project)
          //          .HasForeignKey(d => d.InvestorId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.activity)
          //          .WithMany(p => p.Project)
          //          .HasForeignKey(d => d.ActivityId);

          entity.HasOne(d => d.Site)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.InvestmentActivity)
          //          .WithMany(p => p.Project)
          //          .HasForeignKey(d => d.InvestmentActivityId);
      });

            modelBuilder.Entity<ProjectAssociate>(entity =>
            {
                entity.ToTable("ProjectAssociate", "dbo");

                entity.HasIndex(e => e.AssociateId);

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Associate)
                    .WithMany(p => p.ProjectAssociate)
                    .HasForeignKey(d => d.AssociateId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectAssociate)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectCancellation>(entity =>
            {
                entity.ToTable("ProjectCancellation", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.HasIndex(e => e.ServiceApplicationId);

                entity.Property(e => e.CancellationLetterNo).HasMaxLength(250);

                entity.Property(e => e.CancellationReason).HasMaxLength(1000);

                entity.Property(e => e.CancellationRemark).HasMaxLength(4000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectCancellation)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ServiceApplication)
                    .WithMany(p => p.ProjectCancellation)
                    .HasForeignKey(d => d.ServiceApplicationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectCost>(entity =>
            {
                entity.ToTable("ProjectCost", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectCost)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProjectEmployment>(entity =>
            {
                entity.ToTable("ProjectEmployment", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectEmployment)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProjectImplementationPlan>(entity =>
            {
                entity.ToTable("ProjectImplementationPlan", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.OtherTasksDescription).HasMaxLength(500);

                entity.Property(e => e.Remark).HasMaxLength(4000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectImplementationPlan)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectInjunction>(entity =>
            {
                entity.ToTable("ProjectInjunction", "dbo");

                entity.HasIndex(e => e.SiteId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InjunctionLetterNo).HasMaxLength(250);

                entity.Property(e => e.InjunctionLiftedLetterNo).HasMaxLength(250);

                entity.Property(e => e.InjunctionLiftedReason).HasMaxLength(1000);

                entity.Property(e => e.InjunctionReason).HasMaxLength(1000);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.ProjectInjunction)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectInput>(entity =>
            {
                entity.ToTable("ProjectInput", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectInput)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProjectNationalityComposition>(entity =>
            {
                entity.ToTable("ProjectNationalityComposition", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectNationalityComposition)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProjectOutput>(entity =>
            {
                entity.ToTable("ProjectOutput", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectOutput)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProjectRenewal>(entity =>
            {
                entity.ToTable("ProjectRenewal", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.HasIndex(e => e.ServiceApplicationId);

                entity.HasIndex(e => e.SiteId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectRenewal)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ServiceApplication)
                    .WithMany(p => p.ProjectRenewal)
                    .HasForeignKey(d => d.ServiceApplicationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.ProjectRenewal)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectRequirement>(entity =>
            {
                entity.ToTable("ProjectRequirement", "dbo");

                entity.HasIndex(e => e.ProjectId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectRequirement)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.ToTable("Region", "dbo");

                entity.Property(e => e.RegionId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");
      });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role", "Membership");

                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<RoleClaim>(entity =>
            {
                entity.ToTable("Role_Claim", "Membership");

                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleClaim)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<Sector>(entity =>
            {
                entity.ToTable("Sector", "dbo");

          //entity.Property(e => e.SectorId)
          //          .HasMaxLength(50)
          //          .ValueGeneratedNever();

          entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionAlias)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglishAlias)
                    .IsRequired()
                    .HasMaxLength(500);

          //entity.Property(e => e.DescriptionSort)
          //          .IsRequired()
          //          .HasMaxLength(500);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");
      });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.ToTable("Service", "dbo");

          //entity.HasIndex(e => e.DurationUnitId);

          //entity.Property(e => e.Abbreviation)
          //          .IsRequired()
          //          .HasMaxLength(50);

          //entity.Property(e => e.DisplayName)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.DisplayNameEnglish)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.Icon)
          //          .IsRequired()
          //          .HasMaxLength(50);

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.Name)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.NameEnglish)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.DurationUnit)
          //          .WithMany(p => p.Service)
          //          .HasForeignKey(d => d.DurationUnitId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });
            modelBuilder.Entity<ServicePrerequisite>(entity =>
            {
                entity.ToTable("ServicePrerequisite", "dbo");

          //entity.HasIndex(e => e.DurationUnitId);

          //entity.Property(e => e.Abbreviation)
          //          .IsRequired()
          //          .HasMaxLength(50);

          //entity.Property(e => e.DisplayName)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.DisplayNameEnglish)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.Icon)
          //          .IsRequired()
          //          .HasMaxLength(50);

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.Name)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.NameEnglish)
          //          .IsRequired()
          //          .HasMaxLength(100);

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.DurationUnit)
          //          .WithMany(p => p.Service)
          //          .HasForeignKey(d => d.DurationUnitId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<ServiceApplication>(entity =>
            {
                entity.ToTable("ServiceApplication", "dbo");

                entity.HasIndex(e => e.CurrentStatusId);

                entity.HasIndex(e => e.InvestorId);

                entity.HasIndex(e => e.ProjectId);

                entity.HasIndex(e => e.ServiceId);

                entity.Property(e => e.CaseNumber)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.WindowNumber).HasMaxLength(50);

          //entity.HasOne(d => d.CurrentStatus)
          //          .WithMany(p => p.ServiceApplication)
          //          .HasForeignKey(d => d.CurrentStatusId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.Investor)
          //          .WithMany(p => p.ServiceApplication)
          //          .HasForeignKey(d => d.InvestorId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.Project)
                    .WithMany(p => p.ServiceApplication)
                    .HasForeignKey(d => d.ProjectId);

          //entity.HasOne(d => d.Service)
          //          .WithMany(p => p.ServiceApplication)
          //          .HasForeignKey(d => d.ServiceId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<ServiceApplicationWorkflow>(entity =>
            {
                entity.ToTable("ServiceApplicationWorkflow", "dbo");

                entity.HasIndex(e => e.ServiceApplicationId);

                entity.HasIndex(e => e.ServiceWorkflowId);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Remark).HasMaxLength(4000);

                entity.Property(e => e.SignedBy).HasMaxLength(100);

                entity.Property(e => e.SignedDate).HasColumnType("date");

                entity.Property(e => e.SignerDesignation).HasMaxLength(250);

                entity.Property(e => e.StartDate).HasColumnType("date");

          //entity.HasOne(d => d.ServiceApplication)
          //          .WithMany(p => p.ServiceApplicationWorkflow)
          //          .HasForeignKey(d => d.ServiceApplicationId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.ServiceWorkflow)
          //          .WithMany(p => p.ServiceApplicationWorkflow)
          //          .HasForeignKey(d => d.ServiceWorkflowId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<ServiceOutput>(entity =>
            {
                entity.ToTable("ServiceOutput", "dbo");

                entity.HasIndex(e => e.ServiceApplicationWorkflowId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.From).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.IssuedDate).HasColumnType("date");

                entity.Property(e => e.LetterNo).HasMaxLength(100);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Subject).HasMaxLength(1000);

                entity.Property(e => e.To).HasMaxLength(1000);

          //entity.HasOne(d => d.ServiceApplicationWorkflow)
          //          .WithMany(p => p.ServiceOutput)
          //          .HasForeignKey(d => d.ServiceApplicationWorkflowId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<ServiceSite>(entity =>
            {
                entity.ToTable("ServiceSite", "dbo");

                entity.HasIndex(e => e.ServiceId);

                entity.HasIndex(e => e.SiteId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceSite)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.ServiceSite)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ServiceStep>(entity =>
            {
                entity.ToTable("ServiceStep", "dbo");

                entity.HasIndex(e => e.LegalStatusId);

                entity.HasIndex(e => e.ServiceId);

                entity.Property(e => e.NameEnglish).HasMaxLength(1000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.LegalStatus)
          //          .WithMany(p => p.ServiceStep)
          //          .HasForeignKey(d => d.LegalStatusId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceStep)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ServiceTariff>(entity =>
            {
                entity.ToTable("ServiceTariff", "dbo");

                entity.HasIndex(e => e.ServiceId);

                entity.HasIndex(e => e.TariffId);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.Service)
          //          .WithMany(p => p.ServiceTariff)
          //          .HasForeignKey(d => d.ServiceId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.Tariff)
          //          .WithMany(p => p.ServiceTariff)
          //          .HasForeignKey(d => d.TariffId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<ServiceWorkflow>(entity =>
            {
                entity.ToTable("ServiceWorkflow", "dbo");

                entity.HasIndex(e => e.ActionId);

                entity.HasIndex(e => e.FromStatusId);

                entity.HasIndex(e => e.LegalStatusId);

                entity.HasIndex(e => e.NextStepId);

                entity.HasIndex(e => e.ServiceId);

                entity.HasIndex(e => e.StepId);

                entity.HasIndex(e => e.ToStatusId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.Action)
          //          .WithMany(p => p.ServiceWorkflowAction)
          //          .HasForeignKey(d => d.ActionId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.FromStatus)
          //          .WithMany(p => p.ServiceWorkflowFromStatus)
          //          .HasForeignKey(d => d.FromStatusId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.LegalStatus)
          //          .WithMany(p => p.ServiceWorkflowLegalStatus)
          //          .HasForeignKey(d => d.LegalStatusId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.NextStep)
                    .WithMany(p => p.ServiceWorkflowNextStep)
                    .HasForeignKey(d => d.NextStepId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceWorkflow)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Step)
                    .WithMany(p => p.ServiceWorkflowStep)
                    .HasForeignKey(d => d.StepId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

          //entity.HasOne(d => d.ToStatus)
          //          .WithMany(p => p.ServiceWorkflowToStatus)
          //          .HasForeignKey(d => d.ToStatusId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });
            modelBuilder.Entity<ServiceWorkflowHistory>(entity =>
            {
                entity.ToTable("ServiceWorkflowHistory", "dbo");




            });

            modelBuilder.Entity<ServiceWorkflowInputDocument>(entity =>
            {
                entity.ToTable("ServiceWorkflowInputDocument", "dbo");

                entity.HasIndex(e => e.DocumentTypeId);

                entity.HasIndex(e => e.ServiceWorkflowId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.DocumentType)
          //          .WithMany(p => p.ServiceWorkflowInputDocument)
          //          .HasForeignKey(d => d.DocumentTypeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.ServiceWorkflow)
                    .WithMany(p => p.ServiceWorkflowInputDocument)
                    .HasForeignKey(d => d.ServiceWorkflowId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ServiceWorkflowOutputDocument>(entity =>
            {
                entity.ToTable("ServiceWorkflowOutputDocument", "dbo");

                entity.HasIndex(e => e.LetterTemplateId);

                entity.HasIndex(e => e.ServiceWorkflowId);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.LetterTemplate)
          //          .WithMany(p => p.ServiceWorkflowOutputDocument)
          //          .HasForeignKey(d => d.LetterTemplateId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.ServiceWorkflow)
                    .WithMany(p => p.ServiceWorkflowOutputDocument)
                    .HasForeignKey(d => d.ServiceWorkflowId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Site>(entity =>
            {
                entity.ToTable("Site", "dbo");

                entity.Property(e => e.NameEnglish).HasMaxLength(1000);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<SubSector>(entity =>
            {
                entity.ToTable("SubSector", "dbo");

                entity.HasIndex(e => e.SectorId);

          //entity.Property(e => e.SubSectorId)
          //          .HasMaxLength(50)
          //          .ValueGeneratedNever();

          entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionAlias)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglishAlias)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.DescriptionSort)
                    .IsRequired()
                    .HasMaxLength(500);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          entity.Property(e => e.SectorId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Sector)
                    .WithMany(p => p.SubSector)
                    .HasForeignKey(d => d.SectorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Tariff>(entity =>
            {
                entity.ToTable("Tariff", "dbo");

                entity.HasIndex(e => e.TariffModeId);

                entity.Property(e => e.AccCode)
                    .IsRequired()
                    .HasMaxLength(100);

          //entity.Property(e => e.Description).HasMaxLength(1000);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          //entity.HasOne(d => d.TariffMode)
          //          .WithMany(p => p.Tariff)
          //          .HasForeignKey(d => d.TariffModeId)
          //          .OnDelete(DeleteBehavior.ClientSetNull);
      });

            modelBuilder.Entity<Town>(entity =>
            {
                entity.ToTable("Town", "dbo");

                entity.HasIndex(e => e.RegionId);

                entity.Property(e => e.TownId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          entity.Property(e => e.RegionId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Towns)
                    .HasForeignKey(d => d.RegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "Membership");

                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<UserClaim>(entity =>
            {
                entity.ToTable("User_Claim", "Membership");

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserClaim)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<UserLogin>(entity =>
            {
                entity.ToTable("User_Login", "Membership");

                entity.HasIndex(e => e.UserId);

                entity.HasIndex(e => new { e.LoginProvider, e.ProviderKey })
                    .HasName("AK_User_Login_LoginProvider_ProviderKey")
                    .IsUnique();

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.LoginProvider).IsRequired();

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.ProviderKey).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLogin)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.ToTable("User_Role", "Membership");

                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.CreatedBy).HasDefaultValueSql("((1))");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.UpdatedBy).HasDefaultValueSql("((1))");

                entity.Property(e => e.UpdatedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.ToTable("User_Token", "Membership");

                entity.HasIndex(e => new { e.UserId, e.LoginProvider, e.Name })
                    .HasName("AK_User_Token_UserId_LoginProvider_Name")
                    .IsUnique();

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.LoginProvider).IsRequired();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserToken)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Validation>(entity =>
            {
                entity.Property(e => e.AfanOromo).HasMaxLength(250);

                entity.Property(e => e.Afar).HasMaxLength(250);

                entity.Property(e => e.Amharic)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Arabic).HasMaxLength(250);

                entity.Property(e => e.ControlName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.English)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Somali).HasMaxLength(250);

                entity.Property(e => e.Tigrigna).HasMaxLength(250);

                entity.Property(e => e.ValidationType).HasMaxLength(250);
            });

            modelBuilder.Entity<Woreda>(entity =>
            {
                entity.ToTable("Woreda", "dbo");

                entity.HasIndex(e => e.ZoneId);

          //entity.Property(e => e.WoredaId)
          //          .HasMaxLength(50)
          //          .ValueGeneratedNever();

          entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          entity.Property(e => e.ZoneId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.Woredas)
                    .HasForeignKey(d => d.ZoneId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Zone>(entity =>
            {
                entity.ToTable("Zone", "dbo");

                entity.HasIndex(e => e.RegionId);

                entity.Property(e => e.ZoneId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.DescriptionEnglish)
                    .IsRequired()
                    .HasMaxLength(250);

          //entity.Property(e => e.EventDatetime).HasDefaultValueSql("(getdate())");

          //entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

          //entity.Property(e => e.ObjectId).HasDefaultValueSql("(newid())");

          entity.Property(e => e.RegionId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Zones)
                    .HasForeignKey(d => d.RegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }
    }
}