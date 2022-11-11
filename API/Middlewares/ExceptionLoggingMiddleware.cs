using System.Net;
using System.Text.Json;

namespace API.Middlewares;

public class ExceptionLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionLoggingMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionLoggingMiddleware(RequestDelegate next,
        ILogger<ExceptionLoggingMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            var response = new HttpRequestException(
                (_env.IsDevelopment()) ? ex.Message : "Server Error",
                ex.InnerException,
                HttpStatusCode.InternalServerError
            );

            var jsonString =  JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            });

            await context.Response.WriteAsync(jsonString);
        }
    }
}