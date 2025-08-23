import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoading:true,
    error:null,
    event:null,
    events:[],
    success :false,
    message:null
}

export const eventReducer = createReducer(initialState,(builder)=>{
    builder
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
   }).addCase(
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
   })
   .addCase( "clearError",(state)=>{
    state.error=null;
   })
})