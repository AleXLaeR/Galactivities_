using System.Security.Claims;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Common.Security;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _contextAccessor;

    public UserAccessor(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }
    
    public string GetUsername()
    {
        return _contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    }
}