using System.Text;
using API.Services;
using Domain.Entities;
using Domain.Entities.Users;
using Infrastructure.Interfaces.Services;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration config)
    {
        services.AddIdentityCore<User>(options =>
        {
            options.Password.RequireNonAlphanumeric = false;
        })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>();

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            config.GetValue<string>("TokenKey"))
        );
        
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });
        services.AddAuthorization(options =>
        {
            options.AddPolicy("IsActivityHost", policy =>
                policy.Requirements.Add(new IsHostRequirement()));
        });

        services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}