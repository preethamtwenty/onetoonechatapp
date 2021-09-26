import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import appReducer from '../features/Chat/appSlice';
import onlineSlice from '../features/Online/onlineSlice';

export const store = configureStore({
  reducer: {
   //user: userReducer,
   app:appReducer,
   online:onlineSlice,
  },
});
