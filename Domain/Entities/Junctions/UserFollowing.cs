using System.Reflection;

namespace Domain.Entities.Junctions;

public class UserFollowing
{
    public string ObserverId { get; set; }

    public User Observer { get; set; }

    public string TargetId { get; set; }

    public User Target { get; set; }
}