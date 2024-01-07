import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import devicesReducer from './devices'
import vehiclesReducer from './vehicles'
import dashboardReducer from './dashboard'
import usersReducer from './users'
import reportsReducer from './reports'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      devices: devicesReducer,
      vehicles: vehiclesReducer,
      reports: reportsReducer,
      dashboard: dashboardReducer,
      users: usersReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']