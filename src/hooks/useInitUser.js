import { useEffect } from "react";
import { parseJwt, refreshAccessToken } from "../db/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useHref, useNavigate } from "react-router";

const useInitUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useHref()

  useEffect(() => {
    refreshAccessToken()
      .then((resp) => {
        const token = resp.accessToken;

        const jwtData = parseJwt(token);

        const userData = {
          authentificated: true,
          accessToken: token,
          user: {
            username: jwtData.username,
            email: jwtData.email,
            uid: jwtData.uid,
          },
        };

        dispatch(setUser(userData));
      })
      .catch(() => {
        dispatch(setUser({ authentificated: false }));
        if (path !== "/auth/login" && path !== "/auth/register")
        navigate("/auth/login")
      });
  }, [dispatch]);
};

export default useInitUser;
