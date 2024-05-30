
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Taskopia.DataAccess;
using Taskopia.Models;
using Taskopia.TokenProviders;

namespace Taskopia
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();
            builder.Services.AddSingleton<ITokenProvider, TokenProvider>();
            builder.Services.AddDbContext<NotesDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("Database"));
            });

            builder.Services.AddIdentity<User, IdentityRole>()
                           .AddEntityFrameworkStores<NotesDbContext>()
                           .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["JWT"];
                        return Task.CompletedTask;
                    }
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = builder.Configuration.GetSection("JWTKey:ValidAudience").Value,
                    ValidIssuer = builder.Configuration.GetSection("JWTKey:ValidIssuer").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JWTKey:Secret").Value!))
                };
            });


           

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5173");
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                });
            });

            var app = builder.Build();

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}
