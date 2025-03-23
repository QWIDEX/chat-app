import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../db/users";
import { setUsers } from "../store/slices/usersSlice";

const useUsers = () => {
  const users = useSelector((state) => state.usersSlice.Users);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      setLoading(true);
      getUsers()
        .then((resp) => {
          dispatch(setUsers(resp));
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [users, dispatch]);

  return { users, loading, error };
};

export default useUsers;
