CREATE PROCEDURE sp_get_all_project_group_by_project_stage
AS
SELECT case ProjectStage
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
WHERE  p1.IsDeleted = 'false'
GROUP BY ProjectStage;
go


