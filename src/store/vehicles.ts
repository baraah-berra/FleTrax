import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using axios for API calls
import { useSelector } from 'react-redux';

interface Device {
    // Define the properties of a device here
    id: string;
    name: string;
    // ...other properties
}

interface VehiclesState {
    vehicles: Device[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}

const initialState: VehiclesState = {
    vehicles: [],
    status: 'idle',
    error: null,
};

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async (fields : string) => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios({
                method: 'GET',
                url: process.env.NEXT_PUBLIC_API_URL + 'vehicles/index',
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    search_query: "all",
                    fields, 
                }
            });

            return response.data.data as Device[];
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return Promise.reject(error);
        }
    }
);
export const fetchDevice = createAsyncThunk(
    'vehicles/fetchDevice',
    async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_URL}vehicles/show/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    search_query: "all",
                    fields: "id,device_type_id,protocol_id,configuration,commands,messages_size,messages_ttl,messages_rotate,media_size,media_ttl,media_rotate,blocked,media_blocked,connected,last_active,cid,telemetry,settings,commands_queue,groups,plugins,streams,calcs,metadata,name,device_type_name,protocol_name"
                }
            });

            return response.data.data as Device[];
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return Promise.reject(error);
        }
    }
);

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload;
                state.status = 'success';
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message!;
            })
            .addCase(fetchDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDevice.fulfilled, (state, action) => {
                state.vehicles = action.payload;
                state.status = 'success';
            })
            .addCase(fetchDevice.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message!;
            });
    },
});

export const { } = vehiclesSlice.actions; // No additional actions needed for this slice

export default vehiclesSlice.reducer;
