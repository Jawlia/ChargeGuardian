import { AppRegistry } from 'react-native';
import { checkAndTriggerAlarm } from './checkAndTriggerAlarm';

const BatteryAlarmTask = async (data: any) => {
  const type = data?.type || 'powerChange';
  console.log('🔋 BatteryAlarmTask triggered in background', data);

  await checkAndTriggerAlarm(type); // 👈 Pass the type like 'antiTheft'
};

AppRegistry.registerHeadlessTask('BatteryAlarmTask', () => BatteryAlarmTask);
