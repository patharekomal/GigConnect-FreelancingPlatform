import { sendMessage } from "../api/chatbotApi";

export const askAI = async (data) => {
  const response = await sendMessage(data);

  return response.data;
};
