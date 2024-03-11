import React from "react";
import Login from "../components/Login";

export default function LoginPage() {
  return (
    <div className=" h-[100vh] flex items-center justify-center">
      <Login />
      <div className="h-full w-full bg-gradient-to-r from-myblue to-myPink absolute top-0 -z-10 opacity-70"></div>
      <div className="h-full w-full bg-pattern absolute top-0 -z-20 "></div>
    </div>
  );
}
