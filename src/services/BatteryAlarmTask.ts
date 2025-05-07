import { AppRegistry } from 'react-native';
import { checkAndTriggerAlarm } from './checkAndTriggerAlarm';

const BatteryAlarmTask = async (data: any) => {
  console.log('🔋 BatteryAlarmTask triggered in background', data);
  await checkAndTriggerAlarm();
};

AppRegistry.registerHeadlessTask('BatteryAlarmTask', () => BatteryAlarmTask);

