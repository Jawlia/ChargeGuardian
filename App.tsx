import i18n from './src/locales/i18n';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {store, persistor} from './store';
import {I18nextProvider} from 'react-i18next';
import {useAppDispatch, useAppSelector} from './src/hooks/hooks';
import {PaperProvider} from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';
import {headerTitleStyle, languages} from './src/utils/utils';
import {DarkTheme, LightTheme} from './src/themes/themes';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import GetStartedScreen from './src/screens/GetStartedScreen';
import DrawerNavigator from './src/components/DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './src/services/BatteryAlarmTask';

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  updateFullChargeAlarm,
  updateLowBatteryAlarm,
  completeInitialSetup,
} from './src/store/slices/settingsSlice';
import {ringtones} from './src/config/ringtones';
import {setDarkMode} from './src/store/slices/themeSlice';
import {Appearance} from 'react-native';
import {scheduleBatteryAlarm} from './src/services/scheduleAlarm';
import {checkAndTriggerAlarm} from './src/services/checkAndTriggerAlarm';
import useBatteryStatus from './src/services/hooks/useBatteryStatus';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const themeMode = useAppSelector(state => state.settings.themeMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    if (themeMode === 'auto') {
      dispatch(setDarkMode(systemTheme === 'dark'));
    } else {
      dispatch(setDarkMode(themeMode === 'dark'));
    }
  }, [themeMode]);

  const isDark = useAppSelector(state => state.theme.isDarkMode);
  const theme = isDark ? DarkTheme : LightTheme;

  const navigationTheme = {
    ...((isDark ? NavigationDarkTheme : NavigationDefaultTheme) as any),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      primary: theme.colors.primary,
      border: theme.colors.outline,
      notification: theme.colors.primary,
    },
  };

  useEffect(() => {
    const state = store.getState();
    const {fullChargeAlarm, lowBatteryAlarm} = state.settings;

    if (fullChargeAlarm.isEnabled) {
      scheduleBatteryAlarm('full', fullChargeAlarm.alarmValue);
    }

    if (lowBatteryAlarm.isEnabled) {
      scheduleBatteryAlarm('low', lowBatteryAlarm.alarmValue);
    }
  }, []);

  const fullAlarm = useAppSelector(state => state.settings.fullChargeAlarm);
  const lowAlarm = useAppSelector(state => state.settings.lowBatteryAlarm);
  useEffect(() => {
    const fetchBatteryStatus = async () => {
      await checkAndTriggerAlarm();
    };

    fetchBatteryStatus();
  }, [fullAlarm, lowAlarm]);

  useBatteryStatus();

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const lang = lng || 'en';

      const langMap = languages.reduce(
        (acc, curr) => {
          acc[curr.value] = curr.label.toLowerCase();
          return acc;
        },
        {} as Record<string, string>,
      );

      const suffix = langMap[lang];
      if (!suffix) return;

      const state = store.getState();
      const {fullChargeAlarm, lowBatteryAlarm} = state.settings;

      if (fullChargeAlarm.ringtone.startsWith('battery_full_')) {
        store.dispatch(
          updateFullChargeAlarm({ringtone: `battery_full_${suffix}`}),
        );
      }

      if (lowBatteryAlarm.ringtone.startsWith('battery_low_')) {
        store.dispatch(
          updateLowBatteryAlarm({ringtone: `battery_low_${suffix}`}),
        );
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{
              headerTitleStyle: {
                ...headerTitleStyle,
                color: theme.colors.text,
              },
              headerTintColor: theme.colors.primary,
            }}>
            <Stack.Screen
              name="GetStarted"
              component={GetStartedScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </PaperProvider>
  );
}

function App(): React.JSX.Element {
  const dispatch = store.dispatch;
  const isInitialSetupDone = store.getState().settings.isInitialSetupDone;

  useEffect(() => {
    const init = async () => {
      if (!isInitialSetupDone) {
        const lang = i18n.language || 'en';
        const fullToneKey = `battery_full_${lang}`;
        const lowToneKey = `battery_low_${lang}`;

        const defaultFullTone =
          ringtones.find(r => r.name === fullToneKey)?.name ||
          'battery_full_english';
        const defaultLowTone =
          ringtones.find(r => r.name === lowToneKey)?.name ||
          'battery_low_english';

        dispatch(updateFullChargeAlarm({ringtone: defaultFullTone}));
        dispatch(updateLowBatteryAlarm({ringtone: defaultLowTone}));
        dispatch(completeInitialSetup());
      }
    };

    init().finally(async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      await BootSplash.hide({fade: true});
    });
  }, [dispatch, isInitialSetupDone]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
