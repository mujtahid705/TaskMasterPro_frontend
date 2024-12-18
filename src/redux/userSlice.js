import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  isLoading: false,
  projects: [],
  admin_id: null,
  refresh: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.projects = [];
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setAdminId: (state, action) => {
      state.admin_id = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsLoggedIn,
  setLogout,
  setToken,
  setIsLoading,
  setProjects,
  setAdminId,
  setRefresh,
  setEmployees,
} = userSlice.actions;

export default userSlice.reducer;
