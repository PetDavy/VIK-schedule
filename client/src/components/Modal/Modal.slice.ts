import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpenModal: boolean;
}

const initialState: ModalState = {
  isOpenModal: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state: ModalState) => {
      state.isOpenModal = true;
    },
    closeModal: (state: ModalState) => {
      state.isOpenModal = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;