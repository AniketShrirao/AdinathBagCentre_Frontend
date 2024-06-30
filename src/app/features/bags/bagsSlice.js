// src/features/bags/bagsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const initialState = {
    bags: [],
    status: 'idle',
    error: null,
};

// Fetch all bags from the backend
export const fetchBags = createAsyncThunk('bags/fetchBags', async () => {
    try {
        const response = await axios.get(`${API_DOMAIN}/api/bags`);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message || error.message);
    }
});

// Update bag status along with price and description
export const updateBagStatus = createAsyncThunk('bags/updateBagStatus', async ({ id, status, price, description }) => {
    try {
        const response = await axios.put(`${API_DOMAIN}/api/bags/${id}`, { status, price, description });
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message || error.message);
    }
});

// Register a new bag
export const registerBag = createAsyncThunk('bags/registerBag', async (bagDetails) => {
    try {
        const response = await axios.post(`'${API_DOMAIN}/api/bags'`, bagDetails);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message || error.message);
    }
});

const bagsSlice = createSlice({
    name: 'bags',
    initialState,
    reducers: {
        // Additional local reducers can be defined here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bags = action.payload;
                state.error = null;
            })
            .addCase(fetchBags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateBagStatus.fulfilled, (state, action) => {
                const updatedBag = action.payload;
                const index = state.bags.findIndex((bag) => bag._id === updatedBag._id);
                if (index !== -1) {
                    state.bags[index] = updatedBag;
                }
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    },
});

export const selectAllBags = (state) => state.bags.bags;
export const selectBagById = (state, bagId) => state.bags.bags.find(bag => bag._id === bagId);

export default bagsSlice.reducer;
