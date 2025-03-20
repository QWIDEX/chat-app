// import { receiveMessage } from "./slices/chatsSlice";

const createWebSocketMiddleware = (url) => {
  let socket;

  return () => (next) => (action) => {
    switch (action.type) {
      case "user/setUser": {
        if (!socket) {
          socket = new WebSocket(url);

          socket.onopen = () => {
            socket.send(
              JSON.stringify({ accessToken: action.payload.accessToken })
            );
          };

          socket.onmessage = (e) => {
            console.log(JSON.parse(e.data));
            // storeAPI.dispatch(receiveMessage(JSON.parse(e.data)));
          };
        }
        break;
      }
      case "chats/sendMessage": {
        console.log(action.payload)
        socket.send(JSON.stringify(action.payload));
        break
      }
    }

    return next(action);
  };
};

export default createWebSocketMiddleware;
