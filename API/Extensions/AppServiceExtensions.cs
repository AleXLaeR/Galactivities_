using Application.Activities;
using Application.Core;
using Infrastructure.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions;

public static class AppServiceExtensions
{
    public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
        });
        
        services.AddControllers();
        
        services.AddDbContext<DataContext>(option =>
            option.UseNpgsql(config.GetConnectionString("defaultConnection")!)
        );
        
        services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
        {
            policy
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(config.GetValue<string>("origin"));
        }));

        services.AddMediatR(typeof(List.Handler).Assembly);
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddSignalR();
        
        services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
        services.AddScoped<IUserAccessor, UserAccessor>();
        services.AddScoped<IImageAccessor, ImageAccessor>();
    }
}