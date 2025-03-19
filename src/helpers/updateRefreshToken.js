import { setUser } from "../store/slices/userSlice";
import { parseJwt, refreshAccessToken } from "../db/auth";

const updateRefreshToken = (dispatch) => {
    refreshAccessToken()
    .then((resp) => {
      const token = resp.accessToken;

      const jwtData = parseJwt(token);

      const userData = {
        accessToken: token,
        user: {
          username: jwtData.username,
          email: jwtData.email,
          uid: jwtData.uid,
        },
      };

      dispatch(setUser(userData));
    })
    .catch(() => {});
}

export default updateRefreshToken