namespace LoggingService.DTOs
{
    public class CreateLogRequest
    {
        public string Level { get; set; } = "INFO";

        public string Message { get; set; } = string.Empty;

        public string? ServiceName { get; set; }

        public int? UserId { get; set; }

        public string? Endpoint { get; set; }

        public string? HttpMethod { get; set; }

        public string? Exception { get; set; }
    }
}