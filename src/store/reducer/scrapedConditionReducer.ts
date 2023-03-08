import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Icondition } from '../../lib/interface/Icondition';

const initialState: Icondition = {
  keyword: '',
  date: '',
  nation: '',
};

export const scrapedConditionSlice = createSlice({
  name: 'scrapedCondition',
  initialState,
  reducers: {
    setScrapedConditionsAction: (state, action: PayloadAction<Icondition>) => {
      state = action.payload;
    },
  },
});

export const { setScrapedConditionsAction } = scrapedConditionSlice.actions;

export default scrapedConditionSlice.reducer;
