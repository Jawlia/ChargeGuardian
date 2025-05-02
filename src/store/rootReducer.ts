import {combineReducers} from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import batterySlice from './slices/batterySlice';
import themeSlice from './slices/themeSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  battery: batterySlice,
  theme: themeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
