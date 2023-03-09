import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/Icondition';

const initialState: ICondition = {
  keyword: '',
  date: '',
  nation: [],
};

export const conditionSlice = createSlice({
  name: 'condition',
  initialState,
  reducers: {
    setConditionsAction: (state, action: PayloadAction<ICondition>) => {
      state = action.payload;
    },
  },
});

export const { setConditionsAction } = conditionSlice.actions;

export default conditionSlice.reducer;
