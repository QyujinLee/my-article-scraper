import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  scrapedIds: string[];
}

const initialState: IState = {
  scrapedIds: [],
};

export const scrapedIdsSlice = createSlice({
  name: 'scrapedIdsSlice',
  initialState,
  reducers: {
    setScrapedIdsAction: (state, action: PayloadAction<Array<string>>) => {
      state.scrapedIds = action.payload;
      localStorage.setItem('ids', JSON.stringify(Array.from(state.scrapedIds)));
    },
  },
});

export const { setScrapedIdsAction } = scrapedIdsSlice.actions;

export default scrapedIdsSlice.reducer;
