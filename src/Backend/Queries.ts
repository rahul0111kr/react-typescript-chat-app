import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utlis/toast";
import CatchErr from "../utlis/catchErr";
import { setLoadingType, signInCred, userType } from "../types";
import { NavigateFunction } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { promises } from "dns";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utlis/ConvertTime";

const userColl = "users";
const taskColl = "tasks";
const taskListColl = "taskList";
const chatColl = "chats";
const messages = "messeges";

export const BE_signUp = (
  data: signInCred,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPassword } = data;

  setLoading(true);

  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          console.log(user);

          const imgLink = `https://api.multiavatar.com/${
            user.email?.split("@")[0]
          }.png`;

          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            imgLink
          );

          dispatch(setUser(userInfo));

          setLoading(false);
          reset();
          goTo("/dashboard");
        })
        .catch((err) => {
          CatchErr(err);
          setLoading(false);
        });
    } else toastErr("Password must match", setLoading);
  } else toastErr(" Fields Should not be empty", setLoading);
};

export const BE_signIn = (
  data: signInCred,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  setLoading(true);
  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        updateUserInfo({ id: user.uid, isOnline: true });
        //get user info
        const userInfo = await getUserInfo(user.uid);

        //TODO: set user in store and local storage
        dispatch(setUser(userInfo));

        setLoading(false);
        reset();
        goTo("/dashboard");
      })
      .catch((err) => {
        CatchErr(err);
        setLoading(false);
      });
  } else toastErr(" Fields Should not be empty");
};

// add user to collection

const addUserToCollection = async (
  id: string,
  email: string,
  username: string,
  img: string
) => {
  await setDoc(doc(db, userColl, id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `hi my name is ${username}`,
  });

  return getUserInfo(id);
};

// get user information

const getUserInfo = async (id: string): Promise<userType> => {
  const userRef = doc(db, userColl, id);
  const user = await getDoc(userRef);

  if (user.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      user.data();
    return {
      id: user.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? ConvertTime(creationTime.toDate())
        : "no date found yet",
      lastSeen: creationTime
        ? ConvertTime(creationTime.toDate())
        : "no date found yet",
    };
  } else {
    toastErr("getUserInFo: user no found");
    return defaultUser;
  }
};

// update user info

const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }

  if (id) {
    // Set the "capital" field of the city 'DC'
    await updateDoc(doc(db, userColl, id), {
      ...(username && { username }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      ...(img && { img }),

      lastSeen: serverTimestamp(),
    });
  }
};

const getStorageUser = () => {
  const userData = localStorage.getItem("user");
  if (userData) return JSON.parse(userData);
  else return null;
};
