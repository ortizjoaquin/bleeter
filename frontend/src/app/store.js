import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bleetReducer from '../features/bleets/bleetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bleets: bleetReducer
  },
});
