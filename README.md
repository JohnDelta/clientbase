# Client Base

- SQL Server Management Studio 2019
- SQL Server 2022 Developer Edition
- Visual Studio IDE 2022 Community Edition
- Go to clientbaseAPI/clientbaseAPI/appsettings.json and change the ConnectionStrings.DefaultConnection to your own SQL Server
- Note that in the appsettings.json the TrustServerCertificate is set to True so it needs to be removed for non-developing evnironments
see [more](https://stackoverflow.com/a/17658821)
- Create a database named `clientbase` (or change it in the appsettings.json)
- df