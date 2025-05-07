import {NativeModules} from 'react-native';
import {RootState, store} from '../../store';

const {BatteryModule} = NativeModules;

export const playAlarmByType = (type: 'full' | 'low' | 'antiTheft') => {
  const state: RootState = store.getState();
  let config;

  if (type === 'full') {
    config = state.settings.fullChargeAlarm;
  } else if (type === 'low') {
    config = state.settings.lowBatteryAlarm;
  } else {
    config = state.settings.antiTheft;
  }

  if (!config?.isEnabled) return;

  const {ringtone, volume, vibration, repeat} = config;
  BatteryModule.playAlarm(ringtone, volume, vibration, repeat);
};

export const stopAlarm = () => {
  BatteryModule.stopAlarm();
};
