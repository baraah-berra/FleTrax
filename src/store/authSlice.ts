"use client"
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface UserData {
    message: string;
    token: string;
    id: number;
    username: string;
    email: string;
    data: string;
    // ... other fields
}

interface AuthState {
    userData: UserData | null;
    token: string | null | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;

}

interface LoginResponse {
    data: UserData;
    token: string;
    message: string;
}

type User = {
    username: string;
    password: string;
};

export const loginAsync = createAsyncThunk<LoginResponse, FormData>('auth/login', async (data) => {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, data);
    return response.data;
});

export const fetchUserData = createAsyncThunk<any, FormData>('auth/fetchUserData', async (_, { getState }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token is not available');
    }

    const response: AxiosResponse<UserData> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/current_user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
});
export const logoutAsync = createAsyncThunk<void, void>('auth/logout', async (_, { dispatch }) => {
    dispatch(setLoggedOut());
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null,
        status: 'idle',
        error: null,
        token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : null,
    } as AuthState,
    reducers: {
        setLoggedOut: (state) => {
            state.userData = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.status = 'succeeded';
                state.userData = action.payload.data;
                state.token = action.payload.data.token;
                toast.success(action.payload.message);
                localStorage.setItem('token', state.token);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                toast.error(state.error!);
            })
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.status = 'succeeded';
                state.userData = action.payload;
                localStorage.setItem('userData', JSON.stringify(state.userData));
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                toast.error(state.error!);
            })
            .addCase(logoutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.status = 'succeeded';
                toast.success('Logout successful');
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                toast.error(state.error!);
            });
    },
});

export const selectUserData = (state: { auth: AuthState }) => state.auth.userData;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const { setLoggedOut } = authSlice.actions; // Export the new action

export default authSlice.reducer;
