using Microsoft.EntityFrameworkCore;
using Taskopia.Models;

namespace Taskopia.DataAccess
{
    public class NotesDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public NotesDbContext(DbContextOptions<NotesDbContext> options, IConfiguration configuration):base(options)
        {
            _configuration = configuration;
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Note> Notes => Set<Note>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
        }
    }
}
