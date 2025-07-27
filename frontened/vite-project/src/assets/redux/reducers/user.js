import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSucessfully", (state, action) => {
      state.loading = false;
      state.isAuthorized = true;
      state.user = action.payload;
    })
    .addCase("loadUserFailure", (state, action) => {
      state.loading = false;
      state.isAuthorized = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
