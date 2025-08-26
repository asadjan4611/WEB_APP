import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoading:true,
    error:null,
    product:null,
    products:[],
    allproducts:[],
    success :false,
    message:null
}

export const productReducer = createReducer(initialState,(builder)=>{
    builder

    // create product of a shop
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
      state.isLoading=false;
    state.error=action.payload;
    state.success=false
   })
   //get all products of a specif shop
   .addCase(
    "getAllProductsRequest",(state,action)=>{
      state.isLoading=true;
    }
   )
   .addCase("getAllProductsSuccess",(state,action)=>{
    state.isLoading=false;
    state.products = action.payload;
   }).
   addCase("getAllProductsFailure",(state,action)=>{
    state.isLoading=false;
    state.error=action.payload;
   }).

   //delete a products
   addCase("deleteProductRequest",(state)=>{
        state.isLoading= false;
   }).
   addCase("deleteProductSucessfully",(state,action)=>{
         state.isLoading= false;
        state.message=action.payload
   }).
   addCase("deleteProductFailure",(state,action)=>{
        state.isLoading= false;
        state.error=action.payload
   })


   //get all the products of all shops

    .addCase(
    "getAllProductssRequest",(state,action)=>{
      state.isLoading=true;
    }
   )
   .addCase("getAllProductssSuccess",(state,action)=>{
    state.isLoading=false;
    state.allproducts = action.payload;
   }).
   addCase("productssCreateFailure",(state,action)=>{
    state.isLoading=false;
    state.error=action.payload;
   })

   
 // clear the error

   .addCase( "clearError",(state)=>{
    state.error=null;
   })
})



