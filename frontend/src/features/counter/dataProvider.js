import { createSlice } from '@reduxjs/toolkit';

export const dataProvider = createSlice({
  name: 'dataProvider',
  initialState: {
    value: { name: 'Valentin' },
  },
  reducers: {
    config: (state, action) => {
      state.value = action.payload
    },
    setData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { config, setData } = dataProvider.actions

export default dataProvider.reducer