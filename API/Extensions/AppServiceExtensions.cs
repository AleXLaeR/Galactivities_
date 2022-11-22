using Application.Activities;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
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
            option.UseSqlServer(config.GetConnectionString("defaultConnection")!)
        );
        
        services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
        {
            policy
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:3000");
        }));

        //services.AddFluentValidationAutoValidation(_config =>
        //{
        //    _config.DisableDataAnnotationsValidation = true;
        //});
        //services.AddValidatorsFromAssemblyContaining(typeof(Create));
        
        services.AddMediatR(typeof(List.Handler).Assembly);
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
    }
}