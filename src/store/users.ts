import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    // Define user properties here
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page: number) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_API_URL}users/index?page=${page}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data as User[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { /* Define relevant action creators here */ } = usersSlice.actions;

export default usersSlice.reducer;
