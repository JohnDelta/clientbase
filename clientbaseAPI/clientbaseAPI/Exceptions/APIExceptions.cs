using System.Net;

namespace clientbaseAPI.Exceptions
{
    public class APIExceptions
    {
        public static readonly APIException UserNotFound = new(
            apiExceptionType: APIExceptionType.NotFound, 
            httpStatusCode: HttpStatusCode.NotFound, 
            title: "Unable to find the user", 
            detail: "");

        public static readonly APIException UsersNotFound = new(
            apiExceptionType: APIExceptionType.NotFound,
            httpStatusCode: HttpStatusCode.NotFound,
            title: "Unable to find the users",
            detail: "");
    }
}
