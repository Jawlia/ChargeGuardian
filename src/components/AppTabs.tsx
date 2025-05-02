import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {headerTitleStyle} from '../utils/utils';
import HomeScreen from '../screens/Home/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import useAppTheme from '../services/hooks/useAppTheme';
import {TouchableOpacity, StyleSheet} from 'react-native';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {spacing} from '../themes/themes';

const Tab = createBottomTabNavigator();

const getTabIcon =
  (routeName: string) =>
  ({color, size}: any) => {
    let iconName = 'home';
    if (routeName === 'Settings') {
      iconName = 'cog';
    } else if (routeName === 'Profile') {
      iconName = 'account';
    }
    return <MaterialIcons name={iconName} color={color} size={size} />;
  };

const MenuButton = ({onPress, colors}: any) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <MaterialIcons name="menu" size={24} color={colors.menuColor} />
  </TouchableOpacity>
);

export default function AppTabs() {
  const {t} = useTranslation();
  const {colors, isDark} = useAppTheme();
  const navigation: any = useNavigation();

  const onPressMenu = useCallback(() => {
    navigation?.openDrawer();
  }, [navigation]);

  const headerLeft = useCallback(
    () => <MenuButton onPress={onPressMenu} colors={colors} />,
    [onPressMenu, isDark],
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        headerLeft,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarIcon: getTabIcon(route.name),
        tabBarStyle: {backgroundColor: colors.background},
        headerStyle: {backgroundColor: colors.background},
        headerTitleStyle: {
          ...headerTitleStyle,
          color: colors.text,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          headerTitle: t('appName'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarLabel: t('settings')}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: t('profile')}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: spacing.md,
  },
});
