import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    error:null,
    userOrders:[],
    shopOrders:[],
     success :false,
}


export const orderReducer= createReducer(initialState,(builder)=>{



    //get orders of a user 
    builder.addCase("orderGetRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("orderGetSuccess",(state,action)=>{
        state.isLoading=false;
        state.userOrders=action.payload;
          state.success =  true;
    })
    .addCase("orderGetFailure",(state,action)=>{
             state.isLoading = false;
             state.error= action.payload;
             state.success=false;
    })


// get user of a specific shop
   
.addCase("orderShopGetRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("orderShopGetSuccess",(state,action)=>{
        state.isLoading=false;
        state.shopOrders=action.payload;
          state.success =  true;
    })
    .addCase("orderShopGetFailure",(state,action)=>{
             state.isLoading = false;
             state.error= action.payload;
             state.success=false;
    })
//clear Error
    .addCase( "clearError",(state)=>{
    state.error=null;
   })
});