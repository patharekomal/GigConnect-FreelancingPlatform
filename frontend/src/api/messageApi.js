import api from "./api";

export const getMessagesByProject = (projectId) => {
  return api.get(`/messages/project/${projectId}`);
};

export const sendMessage = (messageData) => {
  return api.post("/messages", messageData);
};