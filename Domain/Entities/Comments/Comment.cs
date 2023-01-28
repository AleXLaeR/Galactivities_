using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Activities;
using Domain.Entities.Users;

namespace Domain.Entities.Comments;

[Table("comments", Schema = "production")]

public class Comment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string Body { get; set; }

    public User Author { get; set; }

    public Activity Activity { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}