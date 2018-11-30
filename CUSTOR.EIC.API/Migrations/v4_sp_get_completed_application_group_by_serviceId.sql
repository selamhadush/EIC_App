CREATE PROCEDURE sp_get_completed_application_group_by_serviceId
AS
  CREATE TABLE #temp_ser_list (
    service_application_id INT,
    ServiceId              INT,
    service_name           VARCHAR(40)
  );
  INSERT INTO #temp_ser_list
    SELECT
      s1.ServiceApplicationId as service_application_id,
      s1.ServiceId            as ServiceId,
      s2.NameEnglish          as service_name
    FROM ServiceApplication s1
      LEFT JOIN Service as S2
        on s1.ServiceId = S2.ServiceId
    WHERE  s1.IsDeleted = 'false'
          AND s1.CurrentStatusId=44449;


  select
    count(service_application_id) as total,
    service_name
  from #temp_ser_list
  GROUP BY service_name
  DROP TABLE #temp_ser_list
go

