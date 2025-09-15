import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    error:null,
    event:null,
    events:[],
    allevents:[],
    success :false,
    message:null
}

export const eventReducer = createReducer(initialState,(builder)=>{
    builder

    //create events
    .addCase(
   "eventCreateRequest",(state)=>{
    state.isLoading=true;
   })
   .addCase("eventCreateSuccess",(state,action)=>{
    state.isLoading=false;
    state.event=action.payload;
    state.success=true
   })
   .addCase("eventCreateFailure",(state,action)=>{
      state.isLoading=false;
    state.error=action.payload;
    state.success=false
   }).
   //get events of a specific shop
   addCase(
    "getAllEventRequest",(state,action)=>{
      state.isLoading=true;
    }
   )
   .addCase("getAllEventsSuccess",(state,action)=>{
    state.isLoading=false;
    state.events = action.payload;
   }).
   addCase("getAllEventsFailure",(state,action)=>{
    state.isLoading=false;
    state.error=action.payload;
   }).

   //delete events
   addCase("deleteEventRequest",(state)=>{
        state.isLoading= false;
   }).
   addCase("deleteEventSucessfully",(state,action)=>{
         state.isLoading= false;
        state.message=action.payload
   }).
   addCase("deleteEventFailure",(state,action)=>{
        state.isLoading= false;
        state.error=action.payload
   }).

addCase(
    "getAllShopEventRequest",(state,action)=>{
      state.isLoading=true;
    }
   )
   .addCase("getAllShopEventsSuccess",(state,action)=>{
    state.isLoading=false;
    state.allevents = action.payload;
   }).
   addCase("getAllShopEventsFailure",(state,action)=>{
    state.isLoading=false;
    state.error=action.payload;
   }).

   //get all events of all shops



   addCase( "clearError",(state)=>{
    state.error=null;
   })
})