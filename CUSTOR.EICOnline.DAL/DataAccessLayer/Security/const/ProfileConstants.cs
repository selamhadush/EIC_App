namespace CUSTOR.Security
{
  public static class ClaimConstants
  {
    ///<summary>A claim that specifies the subject of an entity</summary>
    public const string Subject = "sub";

    ///<summary>A claim that specifies the permission of an entity</summary>
    public const string Permission = "permission";
  }

  public static class PropertyConstants
  {
    public const string FullName = "fullname";

    public const string TIN = "tin";
    public const string SiteCode = "sitecode";

    public const string Configuration = "configuration";
  }

  public static class ScopeConstants
  {
    ///<summary>A scope that specifies the roles of an entity</summary>
    public const string Roles = "roles";
  }
}