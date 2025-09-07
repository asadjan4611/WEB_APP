import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  updateSuccessMessage: "",
  addressloading: false,
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

    // update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.updateSuccessMessage = action.payload;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailure", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.user = action.payload.user;
      state.updateSuccessMessage = action.action.updateSuccessMessage;
    })
    .addCase("deleteUserAddressFailure", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    .addCase("clearMessage", (state) => {
      state.updateSuccessMessage = null;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
