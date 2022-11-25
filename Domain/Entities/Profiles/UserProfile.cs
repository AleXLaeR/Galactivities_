using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Profiles;

public class UserProfile
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string DisplayName { get; set; }

    public string? Biography { get; set; }
    
    public string? ImageUri { get; set; }
}