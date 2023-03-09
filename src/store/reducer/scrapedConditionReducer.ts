import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/ICondition';

const initialState: ICondition = {
  keyword: '',
  date: '',
  nation: '',
  'api-key': import.meta.env.VITE_MY_ARTICLE_SCRAPER_API_KEY,
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
