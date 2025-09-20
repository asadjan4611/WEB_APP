import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller : false,
  isLoading: false,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadSellerRequest", (state) => {
      state.isLoading = true;
      state.isSeller = false;
    })
    .addCase("loadSellerSucessfully", (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    })
    .addCase("loadSellerFailure", (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
       state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
