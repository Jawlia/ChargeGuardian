import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BatteryState {
  isCharging: boolean;
  batteryLevel: number;
  batteryTemprature: number;
  batteryHealth: string;
  batteryCapecity: number | undefined;
  batteryTechnology: string | undefined;
}

const initialState: BatteryState = {
  isCharging: false,
  batteryLevel: 0,
  batteryTemprature: 0,
  batteryHealth: 'Good',
  batteryCapecity: -1,
  batteryTechnology: 'Unknown',
};

const batterySlice = createSlice({
  name: 'battery',
  initialState,
  reducers: {
    setBatteryInfo(
      state,
      action: PayloadAction<{
        isCharging: boolean;
        batteryLevel: number;
        batteryTemprature: number;
        batteryHealth: string;
        batteryCapecity: number | undefined;
        batteryTechnology: string | undefined;
      }>,
    ) {
      state.isCharging = action.payload.isCharging;
      state.batteryLevel = action.payload.batteryLevel;
      state.batteryTemprature = action.payload.batteryTemprature;
      state.batteryHealth = action.payload.batteryHealth;
      state.batteryCapecity = action.payload.batteryCapecity;
      state.batteryTechnology = action.payload.batteryTechnology;
    },
  },
});

export const {setBatteryInfo} = batterySlice.actions;
export default batterySlice.reducer;
