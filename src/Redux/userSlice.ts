import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types";
// import type { RootState } from "./store";m

export const defaultUser: userType = {
  id: "",
  username: "",
  email: "",
  img: "",
  isOnline: false,
  creationTime: "",
  lastSeen: "",
  bio: "",
};

// Define the initial state using that type
const initialState = {
  currentUser: defaultUser,
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      localStorage.setItem("user", JSON.stringify(user));

      state.currentUser = user;
      // set loged in user
    },
    setUsers: (state, action) => {
      // set all users
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
