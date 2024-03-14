import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";

export default function Login() {
  const [login, setlogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [signUPLoading, setsignUPLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = () => {
    const data = {
      email,
      password,
      confirmPassword,
      goTo,
    };
    // console.log(data);
    BE_signUp(data, setsignUPLoading, reset, goTo, dispatch);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  };
  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    // console.log(data);
    BE_signIn(data, setSignInLoading, reset, goTo, dispatch);
  };

  return (
    <div className="w-full  md:w-[450px]">
      <h1 className="text-white f-bold text-center text-4xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col p-6 min-h-[150px] gap-3 bg-white rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!login && (
          <Input
            name="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        )}
        {login ? (
          <>
            <Button
              text="Login"
              secondary
              onClick={handleLogin}
              loading={signInLoading}
            />
            <Button
              onClick={() => setlogin(false)}
              text="Register"
              secondary={false}
            />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleRegister}
              loading={signUPLoading}
            />
            <Button onClick={() => setlogin(true)} text="Login" secondary />
          </>
        )}
      </div>
    </div>
  );
}
