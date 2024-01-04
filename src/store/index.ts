import { fetchDashboardData } from './dashboard';
 import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import devicesReducer from './devicesSlice'
import dashboardReducer from './dashboard'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        devices: devicesReducer, 
        dashboard: dashboardReducer, 
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']