import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder

// create user

    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSucessfully", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("loadUserFailure", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    // update User info

    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })



    .addCase("clearError", (state) => {
      state.error = null;
    });
});
