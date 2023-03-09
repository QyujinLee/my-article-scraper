import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICondition } from '../../lib/interface/ICondition';

const initialState: ICondition = {
  keyword: '',
  date: '',
  nation: '',
  'api-key': import.meta.env.VITE_MY_ARTICLE_SCRAPER_API_KEY,
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
