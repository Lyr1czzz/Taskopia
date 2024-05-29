using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Taskopia.Models;

namespace Taskopia.DataAccess
{
    public class NotesDbContext : IdentityDbContext<User>
    {
        private readonly IConfiguration _configuration;

        public NotesDbContext(DbContextOptions<NotesDbContext> options, IConfiguration configuration):base(options)
        {
            _configuration = configuration;
            try
            {
                var dbCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (dbCreator is not null)
                {
                    if (!dbCreator.CanConnect())
                    {
                        dbCreator.Create();
                    }
                    if (!dbCreator.HasTables())
                    {
                        dbCreator.CreateTables();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public DbSet<Note> Notes => Set<Note>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
             
            builder.Entity<IdentityRole>().HasData(
                [
                    new IdentityRole { Name = "Admin", NormalizedName="ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() },
                    new IdentityRole { Name = "Customer", NormalizedName = "CUSTOMER", ConcurrencyStamp = Guid.NewGuid().ToString() },
                ]);
        }
    }
}
