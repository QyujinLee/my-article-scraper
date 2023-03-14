import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type payloadType = string | undefined;

interface sectionType {
  value: payloadType;
}

const initialState: sectionType = { value: 'home' };

export const sectionTypeSlice = createSlice({
  name: 'sectionType',
  initialState,
  reducers: {
    setSectionTypeAction: (state, action: PayloadAction<payloadType>) => {
      state.value = action.payload;
    },
  },
});

export const { setSectionTypeAction } = sectionTypeSlice.actions;

export default sectionTypeSlice.reducer;
