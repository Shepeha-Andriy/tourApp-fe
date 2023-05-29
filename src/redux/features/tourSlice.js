import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  tour: {},
  tours: [],
  userTours: [],
  loading: false,
  error: ''
}

export const createTour = createAsyncThunk('/auth/createTour', async ({ updaterTourData, navigate, toast }, { rejectWithValue }) => {
  try {
    const res = await api.createTour(updaterTourData)
    toast.success('Tour added successfully')
    navigate('/')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


const authSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addMatcher(
        (action) => action.type === createTour.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === createTour.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          state.tours = [action.payload.tour]
        }
      )
      .addMatcher(
        (action) => action.type === createTour.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
  },
});

export default authSlice.reducer