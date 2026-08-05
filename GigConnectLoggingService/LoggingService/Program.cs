using LoggingService.Data;
using Microsoft.EntityFrameworkCore;

namespace LoggingService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add controllers
            builder.Services.AddControllers();

            // Database & Dependency Injection
            var rawConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            var host = builder.Configuration["HOST"] ?? Environment.GetEnvironmentVariable("HOST");
            var database = builder.Configuration["DATABASE"] ?? Environment.GetEnvironmentVariable("DATABASE");
            var username = builder.Configuration["USERNAME"] ?? Environment.GetEnvironmentVariable("USERNAME");
            var password = builder.Configuration["PASSWORD"] ?? Environment.GetEnvironmentVariable("PASSWORD");
            var port = builder.Configuration["PORT"] ?? Environment.GetEnvironmentVariable("PORT") ?? "26416";

            string connectionString;
            if (!string.IsNullOrEmpty(host) && !string.IsNullOrEmpty(username))
            {
                connectionString = $"Server={host};Port={port};Database={database};User={username};Password={password};SslMode=Required;";
            }
            else
            {
                connectionString = rawConnectionString!;
            }

            builder.Services.AddDbContext<LoggingDbContext>(options =>
                options.UseMySql(
                    connectionString,
                    ServerVersion.AutoDetect(connectionString)
                )
            );

            // OpenAPI
            //  builder.Services.AddOpenApi();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Your React app origin
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

           
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Redirect root URL (http://localhost:5020/) to Swagger UI
            app.MapGet("/", () => Results.Redirect("/swagger"));

            app.UseCors("AllowFrontend");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}