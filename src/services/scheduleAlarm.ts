import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

export const scheduleBatteryAlarm = (
  type: 'full' | 'low' | 'antiTheft',
  timeMillis: number,
) => {
  try {
    BatteryModule.scheduleBatteryAlarm(type, timeMillis);
  } catch (error) {
    console.error('Failed to schedule battery alarm:', error);
  }
};

export const cancelBatteryAlarm = (type: 'full' | 'low' | 'antiTheft') => {
  try {
    BatteryModule.cancelBatteryAlarm(type);
  } catch (error) {
    console.error('Failed to cancel battery alarm:', error);
  }
};
