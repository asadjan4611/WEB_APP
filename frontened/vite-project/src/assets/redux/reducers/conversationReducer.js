import { createReducer } from "@reduxjs/toolkit";

const initialState = {
   conversation:[],
     isLoading:false,
         error:null,
              success :false,
}


export const conversationReducer= createReducer(initialState,(builder)=>{



    //get  conservation
    builder.addCase("createConversationRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("createConversationSuccess",(state,action)=>{
        state.isLoading=false;
        state.conversation=action.payload;
          state.success =  true;
    })
    .addCase("createConversationFailure",(state,action)=>{
             state.isLoading = false;
             state.error= action.payload;
             state.success=false;
    })

});