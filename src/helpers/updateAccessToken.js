import { setUser } from "../store/slices/userSlice";
import { parseJwt, refreshAccessToken } from "../db/auth";

const updateAccessToken = (dispatch) => {
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
};

const updateAccessTokenAndCall = (
  dispatch,
  func = async () => {},
  then = () => {}
) => {
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

      func(token).then((resp) => {
        console.log(2)
        then(resp);
      });

      dispatch(setUser(userData));
    })
    .catch(() => {});
};

export default updateAccessToken;
export { updateAccessTokenAndCall };
