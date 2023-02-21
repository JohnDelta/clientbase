using System.Net;

namespace clientbaseAPI.Exceptions
{
    public class APIException : Exception
    {
        public APIExceptionType APIExceptionType { get; set; } = APIExceptionType.Unknown;
        public HttpStatusCode HttpStatusCode { get; set; } = HttpStatusCode.BadRequest;
        public string Title { get; set; } = string.Empty;
        public string Detail { get; set; } = string.Empty;

        public APIException(
            APIExceptionType apiExceptionType, 
            HttpStatusCode httpStatusCode, 
            string title,
            string detail)
        {
            APIExceptionType = apiExceptionType;
            HttpStatusCode = httpStatusCode;
            Title = title;
            Detail = detail;
        }
    }
}
