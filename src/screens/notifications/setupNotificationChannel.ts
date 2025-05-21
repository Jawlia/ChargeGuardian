import notifee, {AndroidImportance} from '@notifee/react-native';

export const setupNotificationChannel = async () => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: 'alarm',
    name: 'Alarm Notifications',
    importance: AndroidImportance.HIGH,
    vibration: true,
    sound: null, // ⛔ Don't use system sound since we play via BatteryModule
  });
};