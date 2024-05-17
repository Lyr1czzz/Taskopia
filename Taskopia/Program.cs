
using Microsoft.EntityFrameworkCore;
using Taskopia.DataAccess;

namespace Taskopia
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();
            builder.Services.AddDbContext<NotesDbContext>(options=>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("Database"));
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapControllers();

            app.Run();
        }
    }
}
