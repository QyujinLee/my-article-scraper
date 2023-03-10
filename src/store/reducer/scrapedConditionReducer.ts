import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/Icondition';

const initialState: ICondition = {
  keyword: '',
  date: undefined,
  nation: [],
};

export const scrapedConditionSlice = createSlice({
  name: 'scrapedCondition',
  initialState,
  reducers: {
    setScrapedConditionsAction: (state, action: PayloadAction<ICondition>) => {
      const { keyword, date, nation } = action.payload;
      state.keyword = keyword;
      state.date = date;
      state.nation = nation;
    },
  },
});

export const { setScrapedConditionsAction } = scrapedConditionSlice.actions;

export default scrapedConditionSlice.reducer;
