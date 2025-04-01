using dotnetcoreMySqlApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotnetcoreMySqlApi.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        //https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                 .HasMany(e => e.Books)
                 .WithOne(e => e.User)
                 .HasForeignKey(e => e.User_Id)
                 .IsRequired();
        }

        public DbSet<Book> Book { get; set; }
        public DbSet<User> User { get; set; }
    }
}
