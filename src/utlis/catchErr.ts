// import exp from "constants";
import { toastErr } from "./toast";

const CatchErr = (err: { code?: string }) => {
  const { code } = err;
  if (code === "auth/invalid-email") toastErr("invalid email");
  else if (code === "auth/weak-password")
    toastErr("password should be atleast 6 characters");
  else if (code === "auth/user-not-found") toastErr("user not foound");
  else if (code === "auth/email-already-in-use")
    toastErr("email already exits");
  else if (code === "auth/wrong-password") toastErr("wrong password");
  else if (code === "auth/requires-recent-login")
    toastErr("logout and login before updating profile");
  else if (code === "auth/invalid-credential") toastErr("invalid credentials");
  else toastErr("An erroe occured!");
  console.log(err);
};

export default CatchErr;
