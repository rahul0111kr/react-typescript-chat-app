import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function Login() {
  const [login, setlogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = () => {
    const data = {
      email,
      password,
      confirm,
    };
    console.log(data);
  };

  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    console.log(data);
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
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}
        {login ? (
          <>
            <Button text="Login" secondary onClick={handleLogin} />
            <Button
              onClick={() => setlogin(false)}
              text="Register"
              secondary={false}
            />
          </>
        ) : (
          <>
            <Button text="Register" secondary onClick={handleRegister} />
            <Button onClick={() => setlogin(true)} text="Login" secondary />
          </>
        )}
      </div>
    </div>
  );
}
