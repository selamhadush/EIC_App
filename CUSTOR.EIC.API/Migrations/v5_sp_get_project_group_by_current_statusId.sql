CREATE PROCEDURE sp_get_project_group_by_current_statusId(@sectorId INT)
AS
  SELECT
    case ProjectStage
    WHEN '1'
      THEN 'Pre-Implementation'
    WHEN '2'
      THEN 'Implementation'
    WHEN '3'
      THEN 'Operational'
    ELSE '' end
                     as name,
    count(ProjectId) as value
  From Project as p1

    LEFT JOIN Sector S2 on p1.SectorId = S2.SectorId
  WHERE p1.IsDeleted = 'false'

        AND p1.SectorId = @sectorId
  group by p1.ProjectStage
go

