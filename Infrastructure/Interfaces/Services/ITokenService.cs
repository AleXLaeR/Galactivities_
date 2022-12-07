using Domain.Entities;
using Domain.Entities.Users;

namespace Infrastructure.Interfaces.Services;

public interface ITokenService
{
    string GetJwtToken(User user);
}