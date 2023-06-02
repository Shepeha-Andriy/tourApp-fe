import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // user: JSON.parse(localStorage.getItem('profile')) || null,
  search: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch2: (state, action) => {
      state.search = action.payload
    },
  },
});

export const { setSearch2 } = searchSlice.actions

export default searchSlice.reducer
