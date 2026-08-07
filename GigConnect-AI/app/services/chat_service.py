from app.utils.gemini import llm


class ChatService:

    def get_reply(self, message: str):

        response = llm.invoke(message)

        return response.content


chat_service = ChatService()