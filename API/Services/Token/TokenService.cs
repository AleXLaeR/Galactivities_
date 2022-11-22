using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Domain.Enums;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Token;

public class TokenService : ITokenService
{
    public string GetJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),            
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
        };

        var ssKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
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