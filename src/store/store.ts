import { configureStore } from '@reduxjs/toolkit';
import conditionSlice from './reducer/conditionReducer';
import scrapedConditionReducer from './reducer/scrapedConditionReducer';

export const store = configureStore({
  reducer: {
    condition: conditionSlice,
    scrapedCondition: scrapedConditionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
