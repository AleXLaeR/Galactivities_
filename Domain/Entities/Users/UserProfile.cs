using System.ComponentModel.DataAnnotations;
using Domain.Entities.Photos;

namespace Domain.Entities.Users;

public class UserProfile
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string DisplayName { get; set; }

    public string? Biography { get; set; }
    
    public string? ImageUri { get; set; }

    public bool IsFollowing { get; set; }

    public int FollowersCount { get; set; }

    public int FollowingCount { get; set; }

    public List<Image> Images { get; set; } = new();
}