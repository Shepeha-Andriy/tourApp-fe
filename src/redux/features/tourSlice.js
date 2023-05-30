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

export const getTours = createAsyncThunk('/auth/getTours', async ( _, { rejectWithValue }) => {
  try {
    const res = await api.getTours()

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getTour = createAsyncThunk('/auth/getTour', async ( id, { rejectWithValue }) => {
  try {
    const res = await api.getTour(id)

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getToursByUser = createAsyncThunk('/auth/getToursByUser', async ( userId, { rejectWithValue }) => {
  try {
    const res = await api.getToursByUser(userId)

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
      // create tour
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
    // get all tours
      .addMatcher(
        (action) => action.type === getTours.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === getTours.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          state.tours = action.payload
        }
      )
      .addMatcher(
        (action) => action.type === getTours.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
    // get tour
      .addMatcher(
        (action) => action.type === getTour.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === getTour.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          state.tour = action.payload
        }
      )
      .addMatcher(
        (action) => action.type === getTour.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
    // get tours by user
      .addMatcher(
        (action) => action.type === getToursByUser.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === getToursByUser.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          state.userTours = action.payload
        }
      )
      .addMatcher(
        (action) => action.type === getToursByUser.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )

  },
});

export default authSlice.reducer
