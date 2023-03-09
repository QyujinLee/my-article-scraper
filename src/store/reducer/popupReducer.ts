import { createSlice } from '@reduxjs/toolkit';

interface popupType {
  isShowFilter: boolean;
}

const initialState: popupType = { isShowFilter: false };

export const popupTypeSlice = createSlice({
  name: 'popupType',
  initialState,
  reducers: {
    showFilterPopupAction: (state) => {
      state.isShowFilter = true;
    },
    hideFilterPopupAction: (state) => {
      state.isShowFilter = false;
    },
  },
});

export const { showFilterPopupAction, hideFilterPopupAction } = popupTypeSlice.actions;

export default popupTypeSlice.reducer;
