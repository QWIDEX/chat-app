import { useEffect, useState } from "react";
import { getChats } from "../db/chat";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../store/slices/chatsSlice";
import updateAccessToken from "../helpers/updateAccessToken";

const useChats = () => {
  const chats = useSelector((state) => state.chatsSlice.Chats);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userSlice.User);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.authentificated && !chats) {
      setLoading(true)
      getChats(user?.accessToken)
        .then((resp) => {
          dispatch(setChats(resp));
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            updateAccessToken(dispatch);
          }
          setError(err);
          setLoading(false);
        });
    }
  }, [user, dispatch, chats]);

  return { chats, error, loading };
};

export default useChats;
