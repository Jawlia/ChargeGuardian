import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SettingsState {
  isDarkMode: boolean;
  language: string;
}

const initialState: SettingsState = {
  isDarkMode: false,
  language: 'en', // default English
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const {toggleTheme, setLanguage} = settingsSlice.actions;
export default settingsSlice.reducer;
