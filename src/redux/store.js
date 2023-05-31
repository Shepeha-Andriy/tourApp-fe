import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import tourSlice from './features/tourSlice'
import searchSlice from './features/searchSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    tour: tourSlice,
    search: searchSlice
  }
})