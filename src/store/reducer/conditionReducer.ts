import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Icondition } from '../../lib/interface/Icondition';

const initialState: Icondition = {
  keyword: '',
  date: '',
  nation: '',
};

export const conditionSlice = createSlice({
  name: 'condition',
  initialState,
  reducers: {
    setConditionsAction: (state, action: PayloadAction<Icondition>) => {
      state = action.payload;
    },
  },
});

export const { setConditionsAction } = conditionSlice.actions;

export default conditionSlice.reducer;
