namespace LoggingService.Models
{
    public class LogEntry
    {
        public int Id { get; set; }

        public string Level { get; set; } = "INFO";

        public string Message { get; set; } = string.Empty;

        public string? ServiceName { get; set; }

        public int? UserId { get; set; }

        public string? Endpoint { get; set; }

        public string? HttpMethod { get; set; }

        public DateTime Timestamp { get; set; }

        public string? Exception { get; set; }
    }
}