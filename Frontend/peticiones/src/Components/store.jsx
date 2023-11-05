import { configureStore } from '@reduxjs/toolkit'
import modalReducer  from '../features/variables_globales/modalSlice'

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
})