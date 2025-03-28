using Microsoft.EntityFrameworkCore;

namespace dotnetcoreMySqlApi.Data
{
    public class BookContext: DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            : base(options)
        { 
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        public DbSet<Entities.Book> Book { get; set; }
        public DbSet<Entities.User> User { get; set; }
    }
}
