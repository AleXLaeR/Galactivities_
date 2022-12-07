using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Domain.Entities.Users;
using Domain.Enums;
using Infrastructure.Interfaces.Services;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }
    
    public string GetJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),            
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
        };

        var ssKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _config.GetValue<string>("TokenKey"))
        );
        var credentials = new SigningCredentials(ssKey, SecurityAlgorithms.HmacSha512Signature);

        var tokenHandler = new JwtSecurityTokenHandler();
        var actualToken = tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays((double) DayTime.Week),
            SigningCredentials = credentials,
        });

        return tokenHandler.WriteToken(actualToken);
    }
}