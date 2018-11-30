CREATE PROCEDURE sp_get_application_group_by_current_statusId(@serviceId INT)
AS
  SELECT
    CASE s1.CurrentStatusId
    WHEN '44447'
      THEN 'Approve'
    WHEN '44450'
      THEN 'drafted'
    WHEN '44449'
      THEN 'Completed'
    WHEN '44448'
      THEN 'Pending'
    WHEN '44446'
      THEN 'Submitted'
    ELSE '' END                 AS name,
    count(ServiceApplicationId) as value
  FROM ServiceApplication s1

  WHERE s1.IsDeleted = 'false'
        AND s1.ServiceId = @serviceId
  GROUP BY CurrentStatusId
go

