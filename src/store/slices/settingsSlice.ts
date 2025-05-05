import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import i18next from 'i18next';
import {ringtones} from '../../config/ringtones';

interface AlarmSettings {
  isEnabled: boolean;
  alarmValue: number;
  vibration: boolean;
  repeat: boolean;
  ringtone: string;
  volume: number;
}

interface AntiTheftSettings {
  isEnabled: boolean;
  vibration: boolean;
  repeat: boolean;
  ringtone: string;
  volume: number;
  password: number;
}

interface SettingsState {
  isDarkMode: boolean;
  language: string;
  isInitialSetupDone: boolean;
  fullChargeAlarm: AlarmSettings;
  lowBatteryAlarm: AlarmSettings;
  themeMode: 'auto' | 'light' | 'dark';
  temperatureUnit: 'c' | 'f';
  antiTheft: AntiTheftSettings;
}

// 🧠 Get system language
const lang = i18next.language || 'en';

// 🧩 Build dynamic ringtone keys
const fullToneKey = `battery_full_${lang}`;
const lowToneKey = `battery_low_${lang}`;

// ✅ Fallback if not present in ringtone list
const defaultFullTone =
  ringtones.find(r => r.name === fullToneKey)?.name || 'battery_full_english';
const defaultLowTone =
  ringtones.find(r => r.name === lowToneKey)?.name || 'battery_low_english';

const initialState: SettingsState = {
  isDarkMode: false,
  language: lang,
  themeMode: 'auto',
  isInitialSetupDone: false,
  temperatureUnit: 'c',

  antiTheft: {
    isEnabled: false,
    vibration: true,
    repeat: true,
    ringtone: 'gentle_glass_bells_ringtone',
    volume: 0.7,
    password: 0, // 0 = not set
  },

  fullChargeAlarm: {
    isEnabled: true,
    alarmValue: 90,
    vibration: false,
    repeat: true,
    ringtone: defaultFullTone,
    volume: 0.7,
  },
  lowBatteryAlarm: {
    isEnabled: true,
    alarmValue: 20,
    vibration: false,
    repeat: true,
    ringtone: defaultLowTone,
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

    setThemeMode(state, action: PayloadAction<'auto' | 'light' | 'dark'>) {
      state.themeMode = action.payload;
    },

    setLanguage(state, action: PayloadAction<string>) {
      const newLang = action.payload;
      const newFullTone = `battery_full_${newLang}`;
      const newLowTone = `battery_low_${newLang}`;
      const fullExists = ringtones.some(r => r.name === newFullTone);
      const lowExists = ringtones.some(r => r.name === newLowTone);

      state.language = newLang;

      if (
        state.fullChargeAlarm.ringtone.startsWith('battery_full_') &&
        fullExists
      ) {
        state.fullChargeAlarm.ringtone = newFullTone;
      }

      if (
        state.lowBatteryAlarm.ringtone.startsWith('battery_low_') &&
        lowExists
      ) {
        state.lowBatteryAlarm.ringtone = newLowTone;
      }
    },

    completeInitialSetup(state) {
      state.isInitialSetupDone = true;
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

    updateTemperatureUnit(state, action: PayloadAction<'c' | 'f'>) {
      state.temperatureUnit = action.payload;
    },

    updateAntiTheftSettings(
      state,
      action: PayloadAction<Partial<AntiTheftSettings>>,
    ) {
      state.antiTheft = {
        ...state.antiTheft,
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
  setThemeMode,
  completeInitialSetup,
  updateFullChargeAlarm,
  updateLowBatteryAlarm,
  updateTemperatureUnit,
  updateAntiTheftSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
