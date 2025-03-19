import { useEffect, useState } from "react";
import { getChats } from "../db/chat";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../store/slices/chatsSlice";
import updateRefreshToken from "../helpers/updateRefreshToken";
import { useRef } from "react";

const useChats = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chats, setChatsState] = useState();

  const accessToken = useSelector((state) => state.userSlice.User?.accessToken);
  const firstRender = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chats.length === 0) {
      if (!firstRender.current) {
        getChats(accessToken)
          .then((resp) => {
            dispatch(setChats(resp));
            setLoading(false);
            setError(false);
            setChatsState(resp);
          })
          .catch((err) => {
            if (err.status === 401) {
              updateRefreshToken(dispatch);
            }
            setError(err);
            setLoading(false);
          });
      } else {
        firstRender.current = false;
      }
    }
  }, [accessToken, dispatch, chats]);

  return { chats, error, loading };
};

export default useChats;
