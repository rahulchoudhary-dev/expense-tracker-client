import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  fullName: string;
  address?: string;
  phone?: string;
  isActive?: string;
  bio?: string;
  subscriptionStatus?: string;
  role?: string;
  profileUrl?: string;
}

interface UserState {
  user: User | null;
  access_token: string;
  refresh_token: string;
}
interface AuthToken {
  access_token: string | null;
  refresh_token: string | null;
}
const initialState: UserState = {
  user: null,
  access_token: "",
  refresh_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setAuthTokens(state, action: PayloadAction<AuthToken>) {
      state.access_token = action.payload.access_token || "";
      state.refresh_token = action.payload.refresh_token || "";
    },
    setProfileUrl(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user = {
          ...state.user,
          profileUrl: action.payload || "",
        };
      }
    },

    clearUser(state) {
      state.user = null;
      state.access_token = "";
      state.refresh_token = "";
    },
  },
});

export const { setUser, clearUser, setAuthTokens, setProfileUrl } =
  userSlice.actions;
export default userSlice.reducer;
