using Domain.Entities;

namespace Infrastructure.Interfaces.Services;

public interface ITokenService
{
    string GetJwtToken(User user);
}