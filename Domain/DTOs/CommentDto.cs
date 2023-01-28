using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs;

public class CommentDto
{
    [Required]
    public Guid Id { get; set; }
    
    [Required]
    public string Body { get; set; }

    public string Username { get; set; }
    
    public string DisplayName { get; set; }

    public string ImageUri { get; set; }

    public DateTime CreatedAt { get; set; }
}