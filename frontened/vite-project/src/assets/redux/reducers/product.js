import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoading:true,
    error:null,
    product:null,
    success :false
}

export const productReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase(
   "productCreateRequest",(state)=>{
    state.isLoading=true;
   })
   .addCase("productCreateSuccess",(state,action)=>{
    state.isLoading=false;
    state.product=action.payload;
    state.success=true
   })
   .addCase("productCreateFailure",(state,action)=>{
    console.log(action.payload);
      state.isLoading=false;
    state.error=action.payload;
    state.success=false
   }).addCase(
    "getAllProductsRequest",(action)=>{
      state.isLoading=true;
    }
   )
   .addCase("getAllProductsSuccess",(state,action)=>{
    state.isLoading=false;
    state.product = action.payload;
   }).
   addCase("getAllProductsFailure",(state,action)=>{
    state.isLoading=false;
    state.error=action.payload;
   })
   .addCase( "clearError",(state)=>{
    state.error=null;
   })
})