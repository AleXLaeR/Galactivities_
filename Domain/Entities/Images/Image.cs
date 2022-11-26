using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Images;

public class Image
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; }

    [Required]
    public string Uri { get; set; }
    
    public bool IsMain { get; set; }
}