import axios from "axios";

const loggingApi = axios.create({
  baseURL: "http://localhost:5020",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendLog = (logData) => {
  return loggingApi.post("/api/logs", logData);
};

export const getLogs = () => {
  return loggingApi.get("/api/logs");
};
