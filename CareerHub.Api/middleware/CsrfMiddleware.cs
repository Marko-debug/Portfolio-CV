using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

public class CsrfMiddleware
{
    private readonly RequestDelegate _next;

    public CsrfMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value ?? string.Empty;
        var method = context.Request.Method;

        // ✅ 1. Skip CSRF for safe methods (read-only)
        if (HttpMethods.IsGet(method) ||
            HttpMethods.IsHead(method) ||
            HttpMethods.IsOptions(method))
        {
            await _next(context);
            return;
        }

        // ✅ 2. Skip CSRF for auth & token endpoints
        if (path.StartsWith("/api/auth/login") ||
            path.StartsWith("/api/auth/register") ||
            path.StartsWith("/api/auth/refresh") ||
            path.StartsWith("/api/auth/logout") || 
            path.StartsWith("/api/csrf/token") ||
            path.StartsWith("/swagger"))
        {
            await _next(context);
            return;
        }

        // ✅ 3. Require user to be authenticated for unsafe methods
        if (context.User?.Identity?.IsAuthenticated != true)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Authentication required");
            return;
        }

        // ✅ 4. Double-submit cookie check
        var csrfCookie = context.Request.Cookies["XSRF-TOKEN"];
        var csrfHeader = context.Request.Headers["X-CSRF-TOKEN"].FirstOrDefault();

        if (string.IsNullOrEmpty(csrfCookie) ||
            string.IsNullOrEmpty(csrfHeader) ||
            csrfCookie != csrfHeader)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("CSRF token mismatch");
            return;
        }

        // ✅ 5. Continue to next middleware
        await _next(context);
    }
}
