import { NativeModules } from 'react-native';
import { store } from '../../store';
import { playAlarmByType } from './playAlarm';

const { BatteryModule } = NativeModules;

export const checkAndTriggerAlarm = async () => {
  try {
    const state = store.getState();
    const { fullChargeAlarm, lowBatteryAlarm } = state.settings;

    const batteryInfo = await BatteryModule.getBatteryStatus(); // Must exist natively
    if (!batteryInfo || typeof batteryInfo.level !== 'number') {
      console.warn('Invalid battery info');
      return;
    }

    const percent = batteryInfo.level * 100;

    if (fullChargeAlarm.isEnabled && batteryInfo.charging && percent >= fullChargeAlarm.alarmValue) {
      playAlarmByType('full');
    } else if (lowBatteryAlarm.isEnabled && percent <= lowBatteryAlarm.alarmValue && !batteryInfo.charging) {
      playAlarmByType('low');
    } else {
      BatteryModule.stopAlarm(); // ⚠️ No condition matched, stop any running alarm
    }

    // 🔐 Anti-theft unplug logic should be handled separately
  } catch (error) {
    console.error('Alarm check failed:', error);
  }
};
