import { configureStore } from '@reduxjs/toolkit'
import isAdminSlice from '../features/counter/isAdminSlice' 

export default configureStore({
  reducer: {
    defineIsAdmin: isAdminSlice
  },
})