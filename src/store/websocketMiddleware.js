// import { receiveMessage } from "./slices/chatsSlice";

import toast from "react-hot-toast";
import { receiveMessage } from "./slices/chatsSlice";

const createWebSocketMiddleware = (url) => {
  let socket;

  return (storeAPI) => (next) => (action) => {
    switch (action.type) {
      case "user/setUser": {
        if (!socket) {
          if (!action.payload.authentificated) {
            break;
          }
          socket = new WebSocket(url);

          socket.onopen = () => {
            socket.send(
              JSON.stringify({ accessToken: action.payload.accessToken })
            );
          };

          socket.onclose = () => {
            toast.error("Connection lost", { duration: Infinity });
          };

          socket.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.sender !== "server") {
              storeAPI.dispatch(receiveMessage(JSON.parse(e.data)));
            }
          };
        }
        break;
      }
      case "chats/sendMessage": {
        socket.send(JSON.stringify(action.payload));
        break;
      }
    }

    return next(action);
  };
};

export default createWebSocketMiddleware;
