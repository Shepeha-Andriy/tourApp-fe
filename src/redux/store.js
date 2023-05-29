import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import tourSlice from './features/tourSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    tour: tourSlice
  }
})