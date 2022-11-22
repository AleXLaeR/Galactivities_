namespace Domain.DTOs;

public class UserDto
{
    public string DisplayName { get; set; }

    public string Token { get; set; }

    public string Username { get; set; }
    
    public string? ImageUri { get; set; }
}