using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities;
using Domain.Entities.Profiles;

namespace Domain.DTOs;

public class ActivityDto
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; }
    
    public string? Description { get; set; }

    [Required]
    public string Category { get; set; }
    
    [Required]
    public DateTime Date { get; set; }
    
    [Required]
    public string Location { get; set; }
    
    [Required]
    public string Venue { get; set; }
    
    public string HostUsername { get; set; }

    public List<UserProfile> Profiles { get; set; }
}