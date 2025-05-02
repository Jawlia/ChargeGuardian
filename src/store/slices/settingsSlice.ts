import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AlarmSettings {
  isEnabled: boolean;
  alarmValue: number;
  vibration: boolean;
  repeat: boolean;
  ringtone: string;
  volume: number;
}

interface SettingsState {
  isDarkMode: boolean;
  language: string;
  fullChargeAlarm: AlarmSettings;
  lowBatteryAlarm: AlarmSettings;
}

const initialState: SettingsState = {
  isDarkMode: false,
  language: 'en',
  fullChargeAlarm: {
    isEnabled: true,
    alarmValue: 90,
    vibration: false,
    repeat: true,
    ringtone: 'default_full',
    volume: 0.7,
  },
  lowBatteryAlarm: {
    isEnabled: true,
    alarmValue: 20,
    vibration: false,
    repeat: true,
    ringtone: 'default_low',
    volume: 0.7,
  },
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
    updateFullChargeAlarm(
      state,
      action: PayloadAction<Partial<AlarmSettings>>,
    ) {
      state.fullChargeAlarm = {
        ...state.fullChargeAlarm,
        ...action.payload,
      };
    },
    updateLowBatteryAlarm(
      state,
      action: PayloadAction<Partial<AlarmSettings>>,
    ) {
      state.lowBatteryAlarm = {
        ...state.lowBatteryAlarm,
        ...action.payload,
      };
    },
  },
});

export const {
  toggleTheme,
  setLanguage,
  updateFullChargeAlarm,
  updateLowBatteryAlarm,
} = settingsSlice.actions;

export default settingsSlice.reducer;
