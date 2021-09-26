import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
      chatId:null,
      chatName:null,
    },
    reducers: {
      setchatInfo: (state,action) => {
        state.chatId=action.payload.chatId;
        state.chatName=action.payload.chatName;
        

        
      
    },
    deletechatInfo:(state,action)=>{
      state.chatId=null;
      state.chatName=null;


    }
      
      
    },
  });
  
  export const {setchatInfo,deletechatInfo}=appSlice.actions;

  export const selectChatId=state => state.app.chatId;
  export const selectChatName=state=>state.app.chatName;

  
  export default appSlice.reducer;