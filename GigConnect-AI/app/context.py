from dataclasses import dataclass

@dataclass
class ChatContext:
    user_id: int | None = None
    job_id: int | None = None

# Global context object
context = ChatContext()