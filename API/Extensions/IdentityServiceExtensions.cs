using API.Services.Token;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentityCore<User>(options =>
        {
            options.Password.RequireNonAlphanumeric = false;
        })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>();

        services.AddAuthentication();
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}