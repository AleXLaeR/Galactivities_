using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Junctions;

namespace Domain.Entities.Activities;

[Table("activities", Schema = "production")]
public class Activity
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
    
    public bool IsCancelled { get; set; }

    public List<ActivityAttendee> Attendees { get; set; } = new();
}