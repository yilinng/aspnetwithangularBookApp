using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many
//https://medium.com/@jasminewith/entity-framework-core-one-to-many-relationship-62bba94c3ace
namespace dotnetcoreMySqlApi.Entities
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Book_Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Author { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [Range(1, 100)]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public int? User_Id { get; set; } // Required foreign key property

        public User? User { get; set; } = null!; 

    }
}
