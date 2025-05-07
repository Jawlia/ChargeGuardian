import {NativeModules} from 'react-native';

const {AlarmScheduler} = NativeModules;

/**
 * Schedule an alarm to trigger Battery check (Native side) after given interval.
 * @param type 'full' | 'low' | 'antiTheft'
 * @param triggerAfterMs milliseconds from now (example: 15 mins = 15 * 60 * 1000)
 */
export const scheduleAlarm = (
  type: 'full' | 'low' | 'antiTheft',
  triggerAfterMs: number,
) => {
  AlarmScheduler.scheduleAlarm(type, triggerAfterMs);
};
