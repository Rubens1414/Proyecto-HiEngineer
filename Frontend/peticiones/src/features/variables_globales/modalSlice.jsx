import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalActive: false,
  },
  reducers: {
    activateModal: (state) => {
      state.modalActive = true;
    },
    deactivateModal: (state) => {
      state.modalActive = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activateModal, deactivateModal } = modalSlice.actions;

export default modalSlice.reducer;
