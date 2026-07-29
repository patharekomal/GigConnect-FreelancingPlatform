/*import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onConnected) => {
  stompClient = new Client({
    brokerURL: "ws://localhost:8080/chat",

    reconnectDelay: 5000,

    debug: (str) => {
      console.log(str);
    },

    onConnect: () => {
      console.log("✅ WebSocket Connected");

      onConnected();
    },

    onStompError: (frame) => {
      console.error(frame);
    },
  });

  stompClient.activate();
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export const subscribeProject = (projectId, callback) => {
  stompClient.subscribe(
    `/topic/project/${projectId}`,

    (message) => {
      callback(JSON.parse(message.body));
    },
  );
};

export const sendSocketMessage = (message) => {
  stompClient.publish({
    destination: "/app/chat.send",

    body: JSON.stringify(message),
  });
};*/
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onConnected) => {
  stompClient = new Client({
    brokerURL: "ws://localhost:8080/chat",

    reconnectDelay: 5000,

    debug: (str) => {
      console.log(str);
    },

    onConnect: () => {
      console.log("✅ Connected to WebSocket");
      onConnected();
    },

    onStompError: (frame) => {
      console.error("STOMP Error:", frame);
    },

    onWebSocketError: (error) => {
      console.error("WebSocket Error:", error);
    },

    onWebSocketClose: () => {
      console.log("WebSocket connection closed");
    },
  });

  stompClient.activate();
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};

export const subscribeProject = (projectId, callback) => {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ WebSocket is not connected");
    return;
  }

  stompClient.subscribe(`/topic/project/${projectId}`, (message) => {
    const receivedMessage = JSON.parse(message.body);

    callback(receivedMessage);
  });
};

export const sendSocketMessage = (message) => {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ WebSocket is not connected");

    return;
  }

  stompClient.publish({
    destination: "/app/chat.send",

    body: JSON.stringify(message),
  });
};
