import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using axios for API calls
import { useSelector } from 'react-redux';

interface Device {
    // Define the properties of a device here
    id: string;
    name: string;
    // ...other properties
}

interface DevicesState {
    devices: Device[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}

const initialState: DevicesState = {
    devices: [],
    status: 'idle',
    error: null,
};

export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'GET',
                url: process.env.NEXT_PUBLIC_API_URL + 'devices/index',
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    search_query: "all",
                    fields: "id,device_type_id,protocol_id,configuration,commands,messages_size,messages_ttl,messages_rotate,media_size,media_ttl,media_rotate,blocked,media_blocked,connected,last_active,cid,telemetry,settings,commands_queue,groups,plugins,streams,calcs,metadata,name,device_type_name,protocol_name"
                }
            });

            return response.data.data as Device[];
        } catch (error) {
            console.error('Error fetching devices:', error);
            return Promise.reject(error);
        }
    }
);
export const fetchDevice = createAsyncThunk(
    'devices/fetchDevice',
    async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_URL}devices/show/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    search_query: "all",
                    fields: "id,device_type_id,protocol_id,configuration,commands,messages_size,messages_ttl,messages_rotate,media_size,media_ttl,media_rotate,blocked,media_blocked,connected,last_active,cid,telemetry,settings,commands_queue,groups,plugins,streams,calcs,metadata,name,device_type_name,protocol_name"
                }
            });

            return response.data.data as Device[];
        } catch (error) {
            console.error('Error fetching devices:', error);
            return Promise.reject(error);
        }
    }
);

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.devices = action.payload;
                state.status = 'success';
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message!;
            })
            .addCase(fetchDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDevice.fulfilled, (state, action) => {
                state.devices = action.payload;
                state.status = 'success';
            })
            .addCase(fetchDevice.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message!;
            });
    },
});

export const { } = devicesSlice.actions; // No additional actions needed for this slice

export default devicesSlice.reducer;
