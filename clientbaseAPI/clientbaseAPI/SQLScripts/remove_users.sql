USE clientbase;

CREATE TYPE id_list AS TABLE ( id INT );

GO

CREATE PROCEDURE [dbo].[remove_users]

	@user_ids id_list  READONLY

AS

	DELETE FROM [ContactPhones]
	WHERE [ContactPhones].UserId IN (select id from @user_ids)

	DELETE FROM [Users]
	WHERE [Users].UserId IN (select id from @user_ids)

GO