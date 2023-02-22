# Client Base

## Description

A simple webapp that manages a client base with crud functionality.
The clients have the following fields:

    - Name
    - Surname
    - Email
    - Country
    - City
    - Address Line
    - Home phone number
    - Work phone number
    - Mobile phone number


The webapp has the following functions:

    - Add client
    - Remove (1 or multiple) client(s)
    - Update client
    - Display all clients in a table

The application architecturaly is separated in three parts:

    - The representantional layer which is written in React
    - The data layer is a database which is hosted in an SQLServer
    - The business logic layer is an API which is written as an asp .net core web api

Attention was given on the field validation given from both
the webapp and the api directly.
The general rules are:

 - All fields except contact numbers cannot be given empty. Unless you're in the Update method in api where you can skip fields by not including them in the request body (their values won't change).
 - One of the contact numbers must always be not null and not empty.

## API endpoints

<details>
    <summary>api/user/get/all</summary>
    
    Media Type: `application/json`

    Method: `GET`

    Request Body: -

    Response Body:

    ```
    [
        {
            "userId": 0,
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]
    ```

</details>

<details>
    <summary>api/user/create</summary>
    
    Media Type: `application/json`

    Method: `POST`

    Request Body: 
    
    ```
    [
        {
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]

    Response Body:

    ```
    [
        {
            "userId": 0,
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]
    ```

</details>

<details>
    <summary>api/user/update</summary>
    
    Media Type: `application/json`

    Method: `PUT`

    Request Body: 
    
    ```
    [
        {
            "userId": 0,
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]

    Response Body:

    ```
    [
        {
            "userId": 0,
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]
    ```

</details>

<details>
    <summary>api/user/remove</summary>
    
    Media Type: `application/json`

    Method: 'DELETE'

    Request Body: 
    
    ```
    [
        0
    ]

    Response Body:

    ```
    [
        {
            "userId": 0,
            "name": "string",
            "surname": "string",
            "email": "string",
            "country": "string",
            "city": "string",
            "addressLine": "string",
            "mobilePhoneNumber": "string",
            "homePhoneNumber": "string",
            "workPhoneNumber": "string"
        }
    ]
    ```

</details>

<details>
    <summary>api/user/remove/ids</summary>
    
    Media Type: `application/json`

    Method: `DELETE`

    Request Body: 
    
    ```
    [
        0, 1, 2
    ]

    Response Body: -

</details>


## Tech-stack used

- Database
    - SQL Server 2022 Developer Edition
    - SQL Server Management Studio 2019
- API
    - Visual Studio IDE 2022 Community Edition
    - .NET 6 SDK
    - C# 10
    - Utilized ASP.NET Core web api template
    - NuGet Packages:
        - FluentValidation.AspNetCore (11.2.2)
        - EntityFrameworkCore.Design (7.0.3)
        - EntityFrameworkCore.SqlServer (7.0.3)
        - EntityFrameworkCore.Tools (7.0.3)
        - Swashbuckle.AspNetCore (6.2.3)
- Webapp
    - Node.js (18.13.0)
    - NPM (8.19.3)
    - React, React-dom (18.2.0)
    - Javascript, HTML, CSS
    - Bootstrap (5.3.0) (CDN)
    - Font Awesome (4.7.0) (CDN)


## Installation in a local testing environment

    - Have the stack mentioned above installed
    - Clone the project `git clone https://github.com/JohnDelta/clientbase.git`
    - Database
        - Create a database with name `clientbase`
        - Run the clientbase/clientbaseAPI/clientbaseAPI/SQLScripts/remove_users.sql to save the stored procedure
        - Change the clientbase/clientbaseAPI/clientbaseAPI/appsettings.json ConnectionStrings.DefaultConnection string with the name of your local sql server
        - Note: In the appsettings.json the TrustServerCertificate is set to True so it needs to be removed for non-developing evnironments and install a proper certificate. [see](https://stackoverflow.com/a/17658821)
    - API
        - Change the clientbase/clientbaseAPI/clientbaseAPI/appsettings.json WebappHost with your local webapp host. The default is `http://localhost:3000`
        - Go to clientbase/clientbaseAPI/clientbaseAPI/ and update the database with `dotnet ef database update`
    - Webapp
        - Go to clientbase/webapp/Static.js and change the API_BASE with your local api host. Default is `https://localhost:7017/api/`
        - Go to clientbase/webapp and install the node modules with `npm install`
        - Then, run the webapp `npm start`