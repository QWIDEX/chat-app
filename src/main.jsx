import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import Chat from "./pages/Chat.jsx";
import AuthLogin from "./pages/AuthLogin.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AuthRegister from "./pages/AuthRegister.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="chats/:chatId" element={<Chat />} />
          <Route path="auth/login" element={<AuthLogin />} />
          <Route path="auth/register" element={<AuthRegister />} />
          <Route path="chats/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
