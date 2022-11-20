import { createSlice } from '@reduxjs/toolkit';

export const publications = createSlice({
  name: 'definePublications',
  initialState: {
    value: null
  },
  reducers: {
    config: (state, action) => {
      state.value = action.payload
    },
  }
})

export const { config, onPublish2, onDelete } = publications.actions

export default publications.reducer