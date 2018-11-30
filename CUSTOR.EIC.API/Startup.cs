using System;
using System.Collections.Generic;
using System.Reflection;
using AutoMapper;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.API.ModelValidationAttribute;
using CUSTOR.Authorization;
using CUSTOR.EICOnline.API.Authorization;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Address;
using CUSTOR.EICOnline.DAL.DataAccessLayer.bl;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Incentive;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.Security;
using EICOnline.Authorization;
using EICOnline.Helpers;
using EICOnline.IdentityServer;
using EICOnline.ViewModels;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;

//using CUSTOR.API.ExceptionMiddleware;

namespace EICOnline.API
{
    public class Startup
    {
        private readonly IHostingEnvironment _hostingEnvironment;


        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _hostingEnvironment = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.ConfigureIISIntegration();


            services.AddMvc();
            try
            {
                services.AddMvc(options =>
                    {
                        options.Filters.Add(typeof(ModelValidationAttribute)); // add global modelstate filter
                    })
                    .AddJsonOptions(opt =>
                    {
                        var resolver = opt.SerializerSettings.ContractResolver;
                        opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                        if (resolver != null)
                        {
                            var res = resolver as DefaultContractResolver;
                            res.NamingStrategy = null;
                        }
                    });
                var connectionString = Configuration["ConnectionStrings:DefaultConnection"];
                var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly)));

                // add identity
                services.AddIdentity<ApplicationUser, ApplicationRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();

                // Configure Identity options and password complexity here
                services.Configure<IdentityOptions>(options =>
                {
                    // User settings
                    options.User.RequireUniqueEmail = true;
                    options.SignIn.RequireConfirmedEmail = true; // sep 8

                    //    //// Password settings
                    //    //options.Password.RequireDigit = true;
                    //    //options.Password.RequiredLength = 8;
                    //    //options.Password.RequireNonAlphanumeric = false;
                    //    //options.Password.RequireUppercase = true;
                    //    //options.Password.RequireLowercase = false;

                    //    //// Lockout settings
                    //    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                    //    //options.Lockout.MaxFailedAccessAttempts = 10;
                });

                // Adds IdentityServer.
                services.AddIdentityServer()
                    .AddDeveloperSigningCredential()
                    .AddConfigurationStore(options =>
                    {
                        options.ConfigureDbContext = builder =>
                            builder.UseSqlServer(connectionString,
                                sql => sql.MigrationsAssembly(migrationsAssembly));
                    })
                    .AddOperationalStore(options =>
                    {
                        options.ConfigureDbContext = builder =>
                            builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(migrationsAssembly));

                        // this enables automatic token cleanup. this is optional.
                        options.EnableTokenCleanup = true;
                        options.TokenCleanupInterval = 30;
                    })
                    .AddAspNetIdentity<ApplicationUser>()
                    .AddProfileService<ProfileService>();

                var applicationUrl = Configuration["ApplicationUrl"].TrimEnd('/');

                services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = applicationUrl;
                        options.SupportedTokens = SupportedTokens.Jwt;
                        options.RequireHttpsMetadata = false;
                        options.ApiName = IdentityServerConfig.ApiName;
                    });

                services.AddAuthorization(options =>
                {
                    //options.AddPolicy(Policies.ViewAllInvestorsPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewInvestors));
                    //options.AddPolicy(Policies.ManageAllInvestorsPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageInvestors));
                    //options.AddPolicy(Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewUsers));
                    //options.AddPolicy(Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageUsers));
                    //options.AddPolicy(Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewRoles));
                    //options.AddPolicy(Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
                    //options.AddPolicy(Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageRoles));
                    options.AddPolicy(Policies.AssignAllowedRolesPolicy,
                        policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
                    options.AddPolicy(Policies.ViewAllInvestorsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewInvestors));
                    options.AddPolicy(Policies.ManageAllInvestorsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageInvestors));
                    options.AddPolicy(Policies.ViewAllUsersPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewUsers));
                    options.AddPolicy(Policies.ManageAllUsersPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageUsers));
                    options.AddPolicy(Policies.ViewAllRolesPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewRoles));
                    options.AddPolicy(Policies.ViewRoleByRoleNamePolicy,
                        policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
                    options.AddPolicy(Policies.ManageAllRolesPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageRoles));
                    options.AddPolicy(Policies.ManageAllProjectsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageProjects));
                    options.AddPolicy(Policies.ViewAllProjectsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ViewProjects));

                    // Super Administrator Permissions
                    options.AddPolicy(Policies.ManageAdministratorsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageSiteAdministrators));
                    options.AddPolicy(Policies.ManageLookupsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission, ApplicationPermissions.ManageLookups));
                    options.AddPolicy(Policies.ManageSettingsPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageSettings));

                    //Task  dispacher policy
                    options.AddPolicy(Policies.ViewTasksPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ViewServiceRequests));
                    options.AddPolicy(Policies.ManageTasksPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageServiceList));

                    //officer   policy
                    options.AddPolicy(Policies.ViewServiceApplicationPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ViewServiceApplication));
                    options.AddPolicy(Policies.ManageServiceApplicationPolicy,
                        policy => policy.RequireClaim(ClaimConstants.Permission,
                            ApplicationPermissions.ManageServiceApplication));
                });

                // Add cors
                //services.AddCors();
                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials());
                });
                // Add framework services.
                //services.AddMvc();
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new Info {Title = IdentityServerConfig.ApiFriendlyName, Version = "v1"});

                    //c.OperationFilter<AuthorizeCheckOperationFilter>();

                    c.AddSecurityDefinition("oauth2", new OAuth2Scheme
                    {
                        Type = "oauth2",
                        Flow = "password",
                        TokenUrl = $"{applicationUrl}/connect/token",
                        Scopes = new Dictionary<string, string>
                        {
                            {IdentityServerConfig.ApiName, IdentityServerConfig.ApiFriendlyName}
                        }
                    });
                });

                Mapper.Initialize(cfg => { cfg.AddProfile<AutoMapperProfile>(); });

                services.AddScoped<ModelValidationAttribute>();

                // Business Services
                services.AddScoped<IEmailer, Emailer>();
                services.AddScoped<IEmailSender, EmailSendGrid>();
                services.AddScoped<CustomerRepository>();
                services.AddScoped<InvestorRepository>();
                services.AddScoped<LookupRepository>();
                services.AddScoped<RegionRepository>();
                services.AddScoped<ZoneRepository>();
                services.AddScoped<WoredaRepository>();
                services.AddScoped<KebeleRepository>();
                services.AddScoped<TariffRepository>();
                services.AddScoped<ServiceTariffRepository>();
                services.AddScoped<ServicePrerequisiteRepository>();
                services.AddScoped<ServiceStepperRepository>();
                services.AddScoped<ServicesRepository>();
                services.AddScoped<SectorRepository>();
                services.AddScoped<SubSectorRepository>();
                services.AddScoped<ActivityRepository>();
                services.AddScoped<InvestmentActivityRepository>();
                services.AddScoped<OrderRepository>();
                services.AddScoped<ServiceApplicationRepository>();
                services.AddScoped<SiteRepository>();
                services.AddScoped<ApiExceptionFilter>();
                services.AddScoped<OrderRepository>();
                services.AddScoped<OrderDetailRepository>();
                services.AddScoped<ProjectRepository>();
                services.AddScoped<ProjectCostRepository>();
                services.AddScoped<NationalityRepository>();
                services.AddScoped<ProjectEmploymentRepository>();
                services.AddScoped<ProjectNationalityCompositionRepository>();
                services.AddScoped<ServicesRepository>();
                services.AddScoped<ProjectOuputRepository>();
                services.AddScoped<ProjectRequirementRepository>();
                services.AddScoped<ServiceWorkflowHistoryRepo>();

                services.AddScoped<IncentiveRequestItemRepository>();
                services.AddScoped<LetterTemplateRepository>();
                services.AddScoped<TaxExemptionRepository>();

                services.AddScoped<LookupTypeRepository>();
                services.AddScoped<LetterRepository>();
                services.AddScoped<IncentiveRequestDetailRepository>();
                services.AddScoped<IncentiveRequestRepository>();

                //Address

                services.AddScoped<RegionRepo>();
                services.AddScoped<ZoneRepo>();
                services.AddScoped<WoredaRepo>();
                services.AddScoped<KebeleRepo>();
                services.AddScoped<AssociateRepository>();
                services.AddScoped<IncentiveBoMRequestItemsRepository>();


                // Repositories
                services.AddScoped<IAccountManager, AccountManager>();

                // bl
                services.AddScoped<BlRegistrationRepository>();
                services.AddScoped<MajorDivisionRepository>();
                services.AddScoped<MajorGroupRepository>();
                services.AddScoped<DivisionRepository>();
                services.AddScoped<GroupRepository>();
                services.AddScoped<SubGroupRepository>();


                // Auth Handlers
                services.AddSingleton<IAuthorizationHandler, ViewInvestorAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageInvestorAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ViewProjectAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageProjectAuthorizationHandler>();

                services.AddSingleton<IAuthorizationHandler, ManageSettingsAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageSiteAdministratorsAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageLookupsAuthorizationHandler>();


                services.AddSingleton<IAuthorizationHandler, ManageTasksAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ViewServiceListAuthorizationHandler>();

                //officer
                services.AddSingleton<IAuthorizationHandler, ManageServiceApplicationAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ViewServiceApplicationAuthorizationHandler>();

                //aftercare
                services.AddSingleton<IAuthorizationHandler, ManageAftercareDataAuthorizationHandler>();

                //Incentive 
                services.AddSingleton<IAuthorizationHandler, ManageIncentiveAssignedServicesAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ApproveIncentiveUploadedItemsAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, DispatchIncentivesServicesAuthorizationHandler>();

                //Management 
                services.AddSingleton<IAuthorizationHandler, ViewReadOnlyDataAuthorizationHandler>();

                //Registration And Licensing
                services.AddSingleton<IAuthorizationHandler, ManageAssignedServicesAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageCustomerProfilesAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, DispatchLicensingServicesAuthorizationHandler>();
                services.AddSingleton<IAuthorizationHandler, ManageProjectProfilesAuthorizationHandler>();


                // Repositories
                services.AddScoped<IAccountManager, AccountManager>();

                // DB Creation and Seeding
                //services.AddTransient<IdentityServerDbInitializer>();

                services.AddTransient<IDatabaseInitializer, IdentityServerDbInitializer>();


                //services.Configure<IISOptions>(options =>
                //{
                //  options.ForwardClientCertificate = false;
                //});
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                throw new Exception(ex.Message);
            }
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IConfiguration config)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug(LogLevel.Warning);
            loggerFactory.AddFile(Configuration.GetSection("Logging"));

            Utilities.ConfigureLogger(loggerFactory);
            EmailTemplates.Initialize(env, config);

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseExceptionHandler("/Home/Error");

            //Configure Cors
            app.UseCors("CorsPolicy");

            //app.Use(async (context, next) =>
            //{
            //  await next();

            //  if (context.Response.StatusCode == 404
            //      && !Path.HasExtension(context.Request.Path.Value))
            //  {
            //    context.Request.Path = "/index.html";
            //    await next();
            //  }
            //});

            //app.ConfigureCustomExceptionMiddleware();
            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseIdentityServer();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{IdentityServerConfig.ApiFriendlyName} V1");
                c.OAuthClientId(IdentityServerConfig.SwaggerClientID);
                c.OAuthClientSecret("no_password"); //Leaving it blank doesn't work
                c.OAuthAppName("Swagger UI");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });
        }
    }
}