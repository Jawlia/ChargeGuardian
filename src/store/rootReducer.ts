import {combineReducers} from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  // yaha baaki ke slice add karte jayenge jaise auth, alarm etc.
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
