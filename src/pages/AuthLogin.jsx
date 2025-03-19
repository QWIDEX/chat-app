import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import SubmitBtn from "../ui/SubmitBtn";
import eyeClosed from "../icons/eye-off-svgrepo-com.svg";
import eyeOpen from "../icons/eye-show-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { login } from "../db/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const AuthLogin = () => {
  const [isPassShowing, setIsPassShowing] = useState(false);

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email === "") {
      setValidationError("Email field could not be empty");
      return;
    }
    if (password === "") {
      setValidationError("Password field could not be empty");
      return;
    }

    try {
      const resp = await login(email, password);

      dispatch(setUser(resp));
      setValidationError("");
      navigate("/");
    } catch (err) {
      setValidationError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        onSubmit={submitLogin}
        className="w-full h-full max-w-72 flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <TextInput
          type="mail"
          id="email"
          placeholder="Email"
          name="email"
          tabIndex={1}
        />
        <div className="w-full relative">
          <TextInput
            tabIndex={2}
            type={isPassShowing ? "text" : "password"}
            id="password"
            placeholder="Password"
            name="password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setIsPassShowing(!isPassShowing)}
            tabIndex={3}
            className="cursor-pointer"
          >
            {isPassShowing ? (
              <img
                src={eyeOpen}
                alt=""
                className="h-6 w-6 absolute top-1/2 translate-y-[-50%] right-3"
              />
            ) : (
              <img
                src={eyeClosed}
                alt=""
                className="h-6 w-6 absolute top-1/2 translate-y-[-50%] right-3"
              />
            )}
          </button>
        </div>
        {validationError !== "" ? (
          <div className="w-full px-5 py-2 bg-red-400 rounded-md">
            {validationError}
          </div>
        ) : (
          <></>
        )}
        <span>
          Haven't registered yet?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="text-[#748CAB] cursor-pointer hover:text-[#eeedea] transition-all "
            tabIndex={4}
          >
            Register
          </button>
        </span>
        <SubmitBtn tabIndex={5}>Login</SubmitBtn>
      </form>
    </div>
  );
};

export default AuthLogin;
