using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetcoreMySqlApi.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int User_Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string UserName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Email { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        //https://stackoverflow.com/questions/60184661/net-core-3-jsonignore-not-working-when-requesting-single-resource
        public string Password { get; set; }

        public ICollection<Book> Books { get; } = new List<Book>(); // Collection navigation containing dependents


        public Role.Value Role { get; set; }

    }
}
