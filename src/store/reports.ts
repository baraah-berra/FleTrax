import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface Report {
    slug: string;
    name: string;
}

interface ReportsState {
    reports: Report[];
    report: Report | null; // Store a single report
    page: number | null; // Store a single report
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}

const initialState: ReportsState = {
    reports: [],
    report: null,
    page: null,
    status: 'idle',
    error: null,
};

export const fetchReport = createAsyncThunk(
    'reports/fetchReport',
    async ({ slug, params  }: { slug: string; params?: any }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_URL}reports/${slug}`,
                headers: { Authorization: `Bearer ${token}` },
                params, 
            });

            return response.data as Report; // Return a single report
        } catch (error) {
            console.error('Error fetching report:', error);
            return Promise.reject(error);
        }
    }
);

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReport.pending, (state) => {
                state.report = null; // Reset report on pending
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchReport.fulfilled, (state, action: any) => {
                state.report = action.payload.data;
                state.page = action.payload.page;
                state.status = 'success';
            })
            .addCase(fetchReport.rejected, (state, action) => {
                state.report = null; // Reset report on rejection
                state.status = 'error';
                state.error = action.error.message!;
            });
    },
});

export const { } = reportsSlice.actions;

export default reportsSlice.reducer;
