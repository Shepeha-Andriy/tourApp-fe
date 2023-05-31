import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  tour: {},
  tours: [],
  userTours: [],
  currentPage: 1,
  numberOfPages: null,
  loading: false,
  error: ''
}

export const createTour = createAsyncThunk('/tour/createTour', async ({ updaterTourData, navigate, toast }, { rejectWithValue }) => {
  try {
    const res = await api.createTour(updaterTourData)
    toast.success('Tour added successfully')
    navigate('/')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getTours = createAsyncThunk('/tour/getTours', async ( page, { rejectWithValue }) => {
  try {
    const res = await api.getTours(page)

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getTour = createAsyncThunk('/tour/getTour', async ( id, { rejectWithValue }) => {
  try {
    const res = await api.getTour(id)

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getToursByUser = createAsyncThunk('/tour/getToursByUser', async ( _, { rejectWithValue }) => {
  try {
    const res = await api.getToursByUser()

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteTour = createAsyncThunk('/tour/deleteTour', async ( { id, toast }, { rejectWithValue }) => {
  try {
    const res = await api.deleteTour(id)
    toast.success('Tour deleted successfully')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateTour = createAsyncThunk('/tour/updateTour', async ( {updaterTourData, id, toast, navigate }, { rejectWithValue }) => {
  try {
    const res = await api.updateTour(updaterTourData, id)
    toast.success('Tour updated successfully')
    navigate('/')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getToursBySearch = createAsyncThunk('/tour/getTourBySearch', async ( searchQuery, { rejectWithValue }) => {
  try {
    const res = await api.getToursBySearch(searchQuery)

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const likeTour = createAsyncThunk('/tour/likeTour', async ( { _id }, { rejectWithValue }) => {
  try {
    const res = await api.likeTour(_id)

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
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
          state.loading = false;
          state.tours = action.payload.data
          state.numberOfPages = action.payload.numberOfPages
          state.currentPage = action.payload.currentPage
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
        // delete tour
      .addMatcher(
        (action) => action.type === deleteTour.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === deleteTour.fulfilled.type,
        (state, action) => {
          state.loading = false;
          const { arg: {id} } = action.meta
          
          if (id) {
            state.userTours = state.userTours.filter((item) => item._id !== id)
            state.tours = state.tours.filter((item) => item._id !== id)
          }
        }
      )
      .addMatcher(
        (action) => action.type === deleteTour.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
      // update tour
      .addMatcher(
        (action) => action.type === updateTour.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === updateTour.fulfilled.type,
        (state, action) => {
          state.loading = false;
          const { arg: {id} } = action.meta
          
          if (id) {
            state.userTours = state.userTours.map((item) => item._id === id ? action.payload : item)
            state.tours = state.tours.map((item) => item._id === id ? action.payload : item)
          }
        }
      )
      .addMatcher(
        (action) => action.type === updateTour.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
    // get tours by search
      .addMatcher(
        (action) => action.type === getToursBySearch.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === getToursBySearch.fulfilled.type,
        (state, action) => {
          state.loading = false;
          state.tours = action.payload
        }
      )
      .addMatcher(
        (action) => action.type === getToursBySearch.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
    // like tour
      .addMatcher(
        (action) => action.type === likeTour.pending.type,
        (state) => {}
      )
      .addMatcher(
        (action) => action.type === likeTour.fulfilled.type,
        (state, action) => {
          state.loading = false;
          const { arg: {_id} } = action.meta
          if (_id) {
            state.tours = state.tours.map((item) => item._id === _id ? action.payload : item)
          }
        }
      )
      .addMatcher(
        (action) => action.type === likeTour.rejected.type,
        (state, action) => {
          state.error = action.payload.message
        }
      )
  },
});

export const { setCurrentPage } = tourSlice.actions

export default tourSlice.reducer
