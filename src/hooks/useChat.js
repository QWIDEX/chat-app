import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getChat } from "../db/chat";
import { loadMessages } from "../store/slices/chatsSlice";
import updateAccessToken from "../helpers/updateAccessToken";

const useChat = (accessToken, from, length) => {
  const chatId = useParams().chatId;
  const chats = useSelector((state) => state.chatsSlice.Chats);

  const { chat, chatIdx } = useMemo(() => {
    const chatIdx = chats?.findIndex((val) => val.chatId === chatId);
    const chat = chatIdx !== undefined ? chats[chatIdx] : {};
    return { chat, chatIdx };
  }, [chats, chatId]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && from !== 0 && from === chat?.chat?.length) {
      getChat(accessToken, chatId, from, length)
        .then((resp) => {
          dispatch(loadMessages({ chatIdx, messages: resp }));
          setLoading(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            updateAccessToken(dispatch);
          }
          setLoading(false);
        });
    }
  }, [chatId, from, length, dispatch, loading]);

  return { chat, loading };
};

export default useChat;
