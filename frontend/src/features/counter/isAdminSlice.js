import { createSlice } from '@reduxjs/toolkit';

export const isAdminSlice = createSlice({
  name: 'defineIsAdmin',
  initialState: {
    value: false
  },
  reducers: {
    config: (state, action) => {
      state.value = action.payload
    },
    authUser: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { config, authUser } = isAdminSlice.actions

export default isAdminSlice.reducer