using System;
using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public interface IDatabaseInitializer
  {
    Task SeedAsync();
  }

  public class DatabaseInitializer : IDatabaseInitializer
  {
    private readonly ApplicationDbContext _context;
    private readonly IAccountManager _accountManager;
    private readonly ILogger _logger;

    public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
    {
      _accountManager = accountManager;
      _context = context;
      _logger = logger;
    }

    virtual public async Task SeedAsync()
    {
      await _context.Database.MigrateAsync().ConfigureAwait(false);

      //if (!await _context.Users.AnyAsync())
      //{
      try
      {
        _logger.LogInformation("Generating inbuilt accounts");
        const string superAdminRoleName = "Super Administrators";
        //const string userRoleName = "user";

        await EnsureRoleAsync(superAdminRoleName, "Default super administrators", ApplicationPermissions.GetAllPermissionValues());
        //await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

        //await CreateUserAsync("admin", "P@55w0rdtest", "Inbuilt Administrator", "admin@custor.net", "0911205712", new string[] { adminRoleName });
        //await CreateUserAsync("user", "P@55w0rdtest", "Inbuilt Standard User", "user@custor.net", "0911205712", new string[] { userRoleName });
        await CreateUserAsync("SuperAdmin", "P@55w0rdtest", "Inbuilt Super Administrator", "superadmin@custor.net", "0911205712", new string[] { superAdminRoleName });

        _logger.LogInformation("Inbuilt account generation completed");
      }
      catch (Exception ex)
      {
        string s = ex.Message;
        throw new Exception(ex.Message);
      }
      //}
    }

    private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
    {
      if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
      {
        ApplicationRole applicationRole = new ApplicationRole(roleName, description);

        var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

        if (!result.Item1)
          throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
      }
    }

    private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
    {
      ApplicationUser applicationUser = new ApplicationUser
      {
        UserName = userName,
        FullName = fullName,
        Email = email,
        PhoneNumber = phoneNumber,
        EmailConfirmed = true,
        IsEnabled = true
      };

      var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

      if (!result.Item1)
        throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");

      return applicationUser;
    }
  }
}