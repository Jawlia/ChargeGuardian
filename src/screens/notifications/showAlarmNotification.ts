import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {ToastAndroid} from 'react-native';
import {stopAlarm} from '../../services/playAlarm';

export const showAlarmNotification = async (
  type: 'full' | 'low' | 'antiTheft',
) => {
  const titleMap = {
    full: 'Battery Full',
    low: 'Battery Low',
    antiTheft: 'Anti-Theft Alert',
  };

  const bodyMap = {
    full: 'Your phone is fully charged.',
    low: 'Your battery is running low.',
    antiTheft: 'Device unplugged! Anti-theft alarm triggered.',
  };

  ToastAndroid.show(`🔔 Showing notification for ${type}`, ToastAndroid.SHORT);

  await notifee.displayNotification({
    title: titleMap[type],
    body: bodyMap[type],
    android: {
      channelId: 'alarm',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
      actions:
        type !== 'antiTheft'
          ? [
              {
                title: 'Stop Alarm',
                pressAction: {
                  id: 'STOP_ALARM',
                },
              },
            ]
          : undefined,
    },
  });
};

// 👇 call once from App.tsx or startup
notifee.onForegroundEvent(({type, detail}) => {
  if (
    type === EventType.ACTION_PRESS &&
    detail.pressAction?.id === 'STOP_ALARM'
  ) {
    stopAlarm();
    notifee.cancelNotification(detail.notification?.id || '');
  }
});
