using System.ComponentModel.DataAnnotations;

namespace ajgre_technical_interview.Models
{
    public class SanctionedEntity
    {
        public Guid Id => Guid.NewGuid();

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Domicile { get; set; } = string.Empty;

        public bool Accepted { get; set; }
    }
}
