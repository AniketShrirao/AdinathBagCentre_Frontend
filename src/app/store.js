import { configureStore } from '@reduxjs/toolkit';
import bagsReducer from './features/bags/bagsSlice';

export const store = configureStore({
    reducer: {
        bags: bagsReducer,
        // Add more reducers as needed
    },
});
