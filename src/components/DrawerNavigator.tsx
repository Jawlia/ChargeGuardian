import React from 'react';
import AppTabs from './AppTabs';
import {IconButton} from 'react-native-paper';
import {headerTitleStyle} from '../utils/utils';
import {View, Text, StyleSheet} from 'react-native';
import useAppTheme from '../services/hooks/useAppTheme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent, {getDrawerIcon} from './CustomDrawerContent';
import ChargeSettingsScreen from '../screens/Settings/ChargeSettingsScreen';

const Drawer = createDrawerNavigator();
const TAB_ROUTES = ['Home', 'Settings', 'Profile'];
const isTabScreen = (routeName: string) => TAB_ROUTES.includes(routeName);
const getDrawerContent = (props: any) => <CustomDrawerContent {...props} />;

const getHeaderLeft = ({route, navigation}: any) => {
  const name = route.name;
  const showMenu = isTabScreen(name);

  return showMenu ? (
    <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
  ) : (
    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
  );
};

export default function DrawerNavigator() {
  const {colors} = useAppTheme();

  return (
    <Drawer.Navigator
      screenOptions={({route, navigation}) => {
        const tabScreens = ['Dashboard', 'Settings', 'Profile'];
        const isTab = tabScreens.includes(route.name);

        return {
          headerShown: !isTab,
          headerLeft: () => getHeaderLeft({route, navigation}),
          headerTitleStyle: {
            ...headerTitleStyle,
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
        };
      }}
      drawerContent={getDrawerContent}>
      <Drawer.Screen
        name="Dashboard"
        component={AppTabs}
        options={{
          drawerIcon: data => getDrawerIcon(data, 'home-outline'),
        }}
      />
      <Drawer.Screen
        name="Rate Us"
        component={DummyScreen}
        options={{
          drawerIcon: data => getDrawerIcon(data, 'star-outline'),
        }}
      />
      <Drawer.Screen
        name="Refer & Earn"
        component={DummyScreen}
        options={{
          drawerIcon: data => getDrawerIcon(data, 'gift-outline'),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={DummyScreen}
        options={{
          drawerIcon: data => getDrawerIcon(data, 'information-outline'),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={DummyScreen}
        options={{
          drawerIcon: data => getDrawerIcon(data, 'file-document-outline'),
        }}
      />

      <Drawer.Screen
        name="ChargeSettings"
        component={ChargeSettingsScreen}
        options={{title: 'Alarm Settings'}}
      />
    </Drawer.Navigator>
  );
}

const DummyScreen = () => {
  const {colors} = useAppTheme();
  return (
    <View
      style={[
        styles.dummyScreenContainer,
        {backgroundColor: colors.background},
      ]}>
      <Text style={[styles.dummyScreenText, {color: colors.text}]}>
        Coming Soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dummyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyScreenText: {
    fontSize: 16,
  },
});
