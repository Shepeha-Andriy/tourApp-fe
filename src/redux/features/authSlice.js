import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  user: null,
  loading: false,
  error: ''
}

export const login = createAsyncThunk('/auth/login', async ({ formData, navigate, toast }, { rejectWithValue }) => {
  try {
    const res = await api.signIn(formData)
    toast.success('Login successfully')
    navigate('/')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const register = createAsyncThunk('/auth/register', async ({ formData, navigate, toast }, { rejectWithValue }) => {
  try {
    const res = await api.signUp(formData)
    toast.success('Registered successfully')
    navigate('/')

    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addMatcher(
        (action) => action.type === login.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === login.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type === login.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
    // register
      .addMatcher(
        (action) => action.type === register.pending.type,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type === register.fulfilled.type,
        (state, action) => {
          console.log(action)
          state.loading = false;
          localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type === register.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message
        }
      )
  },
});

export default authSlice.reducer
