import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using axios for API calls
import { useSelector } from 'react-redux';


export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async (fields : string) => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios({
                method: 'GET',
                url: process.env.NEXT_PUBLIC_API_URL + 'dashboard',
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    fields, 
                }
            });

            return response.data.data ;
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            return Promise.reject(error);
        }
    }
);
const initialState: any = {
    fetchDashboardData: [],
    status: 'idle',
    error: null,
};
const dashboard = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload;
                state.status = 'success';
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message!;
            })
    },
});

export const { } = dashboard.actions; // No additional actions needed for this slice

export default dashboard.reducer;
