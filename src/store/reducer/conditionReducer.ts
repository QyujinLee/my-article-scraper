import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/ICondition';

const initialState: ICondition = {
  keyword: '',
  date: undefined,
  nation: [],
};

export const conditionSlice = createSlice({
  name: 'condition',
  initialState,
  reducers: {
    setConditionsAction: (state, action: PayloadAction<ICondition>) => {
      const { keyword, date, nation } = action.payload;
      state.keyword = keyword;
      state.date = date;
      state.nation = nation;
    },
  },
});

export const { setConditionsAction } = conditionSlice.actions;

export default conditionSlice.reducer;
