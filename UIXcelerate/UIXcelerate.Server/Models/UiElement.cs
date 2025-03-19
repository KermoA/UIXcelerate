using System.ComponentModel.DataAnnotations;

namespace UIXcelerate.Server.Models
{
    public class UiElement
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string HtmlCode { get; set; }
        [Required]
        public string CssCode { get; set; }
        [Required]
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
