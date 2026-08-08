import api from "./api";

// If FastAPI runs on a different port (e.g. 8000),
// use axios directly instead of your existing api instance.

import axios from "axios";

const chatbotApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const sendMessage = (data) => {
  return chatbotApi.post("/chat", data);
};
