using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs;

public class UserDto
{
    [Required, MaxLength(50)]
    public string DisplayName { get; set; }
    
    public string Token { get; set; }

    [Required, MaxLength(100)]
    public string Username { get; set; }
    
    public string? ImageUri { get; set; }
}