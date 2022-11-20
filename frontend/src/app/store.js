import { configureStore } from '@reduxjs/toolkit';
import isAdminSlice from '../features/counter/isAdminSlice';
import publications from '../features/counter/publications';

export default configureStore({
  reducer: {
    defineIsAdmin: isAdminSlice,
    definePublications: publications
  },
})