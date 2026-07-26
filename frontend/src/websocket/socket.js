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
};
