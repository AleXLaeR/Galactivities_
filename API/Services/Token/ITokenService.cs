using Domain.Entities;

namespace API.Services.Token;

public interface ITokenService
{
    string GetJwtToken(User user);
}