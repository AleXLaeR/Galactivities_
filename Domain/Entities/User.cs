using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

[Table("users", Schema = "identity")]
public class User : IdentityUser
{
    public string DisplayName { get; set; }

    public string Biography { get; set; }
}