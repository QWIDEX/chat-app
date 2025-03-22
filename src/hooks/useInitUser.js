import { useEffect } from "react";
import { parseJwt, refreshAccessToken } from "../db/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const useInitUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    refreshAccessToken()
      .then((resp) => {
        const token = resp.accessToken;

        const jwtData = parseJwt(token);

        const userData = {
          accessToken: token,
          user: {
            username: jwtData.username,
            email: jwtData.email,
            uid: jwtData.uid
          }
        };

        dispatch(setUser(userData));
      })
      .catch(() => {});
  }, [dispatch]);
};

export default useInitUser
