import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './citySlice';

export default configureStore({
  reducer: {
    cities: citiesReducer,
  },
});
