import i18n from './src/locales/i18n';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {store, persistor} from './store';
import {I18nextProvider} from 'react-i18next';
import {useAppSelector} from './src/hooks/hooks';
import {PaperProvider} from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';
import {headerTitleStyle} from './src/utils/utils';
import {DarkTheme, LightTheme} from './src/themes/themes';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import GetStartedScreen from './src/screens/GetStartedScreen';
import DrawerNavigator from './src/components/DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import ChargeSettingsScreen from './src/screens/Settings/ChargeSettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
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
            {/* <Stack.Screen
              name="ChargeSettings"
              component={ChargeSettingsScreen}
              options={{title: 'Alarm Settings'}}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </PaperProvider>
  );
}

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // multiple async tasks
    };

    init().finally(async () => {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
