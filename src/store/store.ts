import { configureStore } from '@reduxjs/toolkit';
import conditionReducer from './reducer/conditionReducer';
import popupReducer from './reducer/popupReducer';
import scrapedConditionReducer from './reducer/scrapedConditionReducer';
import sectionTypeReducer from './reducer/sectionTypeReducer';

export const store = configureStore({
  reducer: {
    sectionType: sectionTypeReducer,
    condition: conditionReducer,
    scrapedCondition: scrapedConditionReducer,
    popupType: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
