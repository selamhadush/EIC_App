CREATE PROCEDURE sp_get_all_project_group_by_economic_sector
AS
  select
    CASE s2.EconomicSector
    WHEN 1
      THEN 'Primary'
    WHEN 2
      THEN 'Secondary'
    WHEN 3
      THEN 'Tertiary'
    Else '' END         AS name,
    count(p1.ProjectId) as value

  from Project as p1
    LEFT JOIN Sector S2 on p1.SectorId = S2.SectorId
  WHERE  p1.IsDeleted = 'false'
  group by s2.EconomicSector;
go

