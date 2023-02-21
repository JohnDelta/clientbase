using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace clientbaseAPI.Exceptions
{
    public class GlobalExceptionHandler : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionResponse(context, ex);
            }
        }

        public static Task HandleExceptionResponse(HttpContext context, Exception ex)
        {
            ProblemDetails problemDetails;

            if (ex.GetType().Name.Equals(typeof(APIException).Name))
            {
                context.Response.StatusCode = (int)((APIException)ex).HttpStatusCode;
                problemDetails = new()
                {
                    Status = (int)((APIException)ex).HttpStatusCode,
                    Type = ((APIException)ex).HttpStatusCode.ToString("F"),
                    Title = ((APIException)ex).Title,
                    Detail = ((APIException)ex).Detail
                };
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                problemDetails = new()
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Type = HttpStatusCode.InternalServerError.ToString("F"),
                    Title = "User-unhandled exception fired.",
                    Detail = ex.Message
                };
            }
            var json = JsonSerializer.Serialize(problemDetails);
            context.Response.ContentType = "application/problem+json";
            return context.Response.WriteAsync(json);
        }
    }
}
