using LoggingService.Models;
using Microsoft.EntityFrameworkCore;

namespace LoggingService.Data
{
    public class LoggingDbContext : DbContext
    {
        public LoggingDbContext(DbContextOptions<LoggingDbContext> options)
            : base(options)
        {
        }

        public DbSet<LogEntry> Logs { get; set; }
    }
}