import { NativeModules } from 'react-native';
import { store } from '../../store';
import { playAlarmByType } from './playAlarm';

const { BatteryModule } = NativeModules;

export const checkAndTriggerAlarm = async (type: string = 'powerChange') => {
  try {
    const state = store.getState();
    const {
      fullChargeAlarm,
      lowBatteryAlarm,
      antiTheft,
    } = state.settings;

    const batteryInfo = await BatteryModule.getBatteryStatus();
    if (!batteryInfo || typeof batteryInfo.level !== 'number') {
      console.warn('Invalid battery info');
      return;
    }

    const percent = batteryInfo.level * 100;

    if (type === 'powerChange') {
      // 🔐 Anti-theft condition (trigger only if was charging and now not)
      if (antiTheft.isEnabled && !batteryInfo.charging) {
        playAlarmByType('antiTheft');
        return;
      }

      // 🔋 Full charge check
      if (
        fullChargeAlarm.isEnabled &&
        batteryInfo.charging &&
        percent >= fullChargeAlarm.alarmValue
      ) {
        playAlarmByType('full');
        return;
      }

      // 🔋 Low battery check
      if (
        lowBatteryAlarm.isEnabled &&
        !batteryInfo.charging &&
        percent <= lowBatteryAlarm.alarmValue
      ) {
         console.log("mkmkm_2",'🔋 Low battery condition met');
        playAlarmByType('low');
        return;
      }

      // ✅ Nothing matches, stop all
      BatteryModule.stopAlarm();
    }

  } catch (error) {
    console.error('Alarm check failed:', error);
  }
};
