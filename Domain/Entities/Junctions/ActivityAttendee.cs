using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Activities;
using Domain.Entities.Users;

namespace Domain.Entities.Junctions;

[Table("activity_user", Schema = "junctions")]
public class ActivityAttendee
{
    public string UserId { get; set; }
    
    public Guid ActivityId { get; set; }
    
    public User User { get; set; }
    public Activity Activity { get; set; }

    public bool IsHost { get; set; }
}