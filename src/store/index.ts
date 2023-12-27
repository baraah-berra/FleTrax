 import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import devicesReducer from './devicesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        devices: devicesReducer, 
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']