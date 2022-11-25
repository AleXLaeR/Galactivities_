using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Common.Security;

public class IsHostRequirement : IAuthorizationRequirement
{
    
}

public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
{
    private readonly DataContext _context;
    private readonly IHttpContextAccessor _contextAccessor;

    public IsHostRequirementHandler(DataContext context, IHttpContextAccessor contextAccessor)
    {
        _context = context;
        _contextAccessor = contextAccessor;
    }
    
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId is null)
            return Task.CompletedTask;

        var activityId = Guid.Parse(_contextAccessor.HttpContext.GetRouteValue("id").ToString()!);

        var attendee = _context.ActivityAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(aa => aa.UserId == userId && aa.Activity.Id == activityId)
            .Result;
        
        if (attendee is null)
            return Task.CompletedTask;
        
        if (attendee.IsHost)
            context.Succeed(requirement);
        
        return Task.CompletedTask;
    }
}