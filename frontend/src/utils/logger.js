import { sendLog } from "../api/loggingApi";

export const logInfo = async ({
  message,
  userId = null,
  endpoint = null,
  httpMethod = null,
}) => {
  try {
    await sendLog({
      level: "INFO",
      message,
      serviceName: "React Frontend",
      userId,
      endpoint,
      httpMethod,
      exception: null,
    });
  } catch (error) {
    // Logging failure should not break the main application
    console.error("Logging failed:", error);
  }
};

//for error handling
export const logError = async ({
  message,
  userId = null,
  endpoint = null,
  httpMethod = null,
  exception = null,
}) => {
  try {
    await sendLog({
      level: "ERROR",
      message,
      serviceName: "React Frontend",
      userId,
      endpoint,
      httpMethod,
      exception,
    });
  } catch (error) {
    // Logging failure should not break the main application
    console.error("Logging failed:", error);
  }
};
