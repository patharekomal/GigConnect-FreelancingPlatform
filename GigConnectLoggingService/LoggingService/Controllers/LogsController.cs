using LoggingService.Data;
using LoggingService.DTOs;
using LoggingService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoggingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly LoggingDbContext _context;

        public LogsController(LoggingDbContext context)
        {
            _context = context;
        }

        // POST: api/logs
        [HttpPost]
        public async Task<IActionResult> CreateLog(
            [FromBody] CreateLogRequest request)
        {
            var log = new LogEntry
            {
                Level = request.Level,
                Message = request.Message,
                ServiceName = request.ServiceName,
                UserId = request.UserId,
                Endpoint = request.Endpoint,
                HttpMethod = request.HttpMethod,
                Exception = request.Exception,
                Timestamp = DateTime.UtcNow
            };

            _context.Logs.Add(log);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "Success",
                message = "Log saved successfully",
                logId = log.Id
            });
        }


        // GET: api/logs
        [HttpGet]
        public async Task<IActionResult> GetLogs()
        {
            var logs = await _context.Logs
                .OrderByDescending(x => x.Timestamp)
                .ToListAsync();

            return Ok(logs);
        }


        // GET: api/logs/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLog(int id)
        {
            var log = await _context.Logs
                .FirstOrDefaultAsync(x => x.Id == id);

            if (log == null)
            {
                return NotFound(new
                {
                    message = "Log not found"
                });
            }

            return Ok(log);
        }
    }
}