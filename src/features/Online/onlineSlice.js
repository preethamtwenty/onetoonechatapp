import { createSlice } from '@reduxjs/toolkit';

export const onlineSlice = createSlice({
    name: 'online',
    initialState: {
      online_users:[]
    },
    reducers: {
      setOnlineUsers: (state,action) => {
        state.online_users=action.payload
        

        
      
    },
    
      
      
    },
  });
  
  export const {setOnlineUsers}=onlineSlice.actions;

  export const selectOnlineUsers=state => state.online.online_users;
  

  
  export default onlineSlice.reducer;