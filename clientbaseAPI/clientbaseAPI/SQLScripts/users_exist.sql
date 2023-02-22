CREATE PROCEDURE [dbo].[users_exist]

	@user_ids ID_LIST  READONLY

AS

	IF EXISTS(SELECT Name, ID from @user_ids
		LEFT JOIN Users on ID = UserId
		WHERE ISNULL(Name, '') = '')

		--THROW 50000, 'Error: Unable to fetch users with the given IDs.', 1;
		SELECT 1 AS FETCH_CODE

	ELSE 
	
		SELECT 0 AS FETCH_CODE