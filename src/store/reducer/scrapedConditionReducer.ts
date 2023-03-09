import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/Icondition';

const initialState: ICondition = {
  keyword: '',
  date: '',
  nation: [],
};

export const scrapedConditionSlice = createSlice({
  name: 'scrapedCondition',
  initialState,
  reducers: {
    setScrapedConditionsAction: (state, action: PayloadAction<ICondition>) => {
      state = action.payload;
    },
  },
});

export const { setScrapedConditionsAction } = scrapedConditionSlice.actions;

export default scrapedConditionSlice.reducer;
