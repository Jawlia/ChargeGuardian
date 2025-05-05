import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {spacing} from '../themes/themes';
import {useTranslation} from 'react-i18next';
import useAppTheme from '../services/hooks/useAppTheme';
import {Text, Avatar, Menu} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import {height as deviceHeight} from '../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setThemeMode} from '../store/slices/settingsSlice';

export const getDrawerIcon = (
  {color, size}: {color: string; size: number},
  iconName: string,
) => <MaterialIcons name={iconName} size={size} color={color} />;

const CustomDrawerContent = (props: any) => {
  const {t} = useTranslation();
  const {height} = useWindowDimensions();
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(state => state.settings.themeMode);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelectTheme = (mode: 'auto' | 'light' | 'dark') => {
    dispatch(setThemeMode(mode));
    setMenuVisible(false);
  };

  const getLabel = (mode: string) =>
    mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.contentContainer,
        {backgroundColor: colors.background},
      ]}>
      {/* 🔵 Header */}
      <View
        style={[
          styles.header,
          {height: height * 0.26, backgroundColor: colors.primary},
        ]}>
        <View style={styles.headerTop}>
          <Avatar.Icon size={60} icon="account-circle" color="white" />
          <MaterialIcons name="weather-night" size={24} color="#fff" />
        </View>

        <Text style={styles.username}>Emma</Text>
        <Text style={styles.phone}>+91 9876543210</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.listContainer}>
        <DrawerItemList {...props} />

        <View style={styles.themeDropdown}>
          <Text style={[styles.label, {color: colors.text}]}>Theme</Text>

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={styles.menuAnchor}>
                <Text style={[styles.menuValue, {color: colors.primary}]}>
                  {getLabel(themeMode)}
                </Text>
                <MaterialIcons
                  name="chevron-down"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => handleSelectTheme('auto')} title="Auto" />
            <Menu.Item
              onPress={() => handleSelectTheme('light')}
              title="Light"
            />
            <Menu.Item onPress={() => handleSelectTheme('dark')} title="Dark" />
          </Menu>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, {borderTopColor: colors.outline}]}>
        <DrawerItem
          label={t('upgradeToPro')}
          icon={data => getDrawerIcon(data, 'star')}
          onPress={() => {}}
        />
        <DrawerItem
          label={t('logout')}
          icon={data => getDrawerIcon(data, 'logout')}
          onPress={() => {}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    borderBottomRightRadius: 120,
    paddingHorizontal: spacing.lg,
    width: '108%',
    marginLeft: '-4%',
    paddingTop: deviceHeight * 0.06,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    marginTop: spacing.md,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#ddd',
    marginTop: spacing.xs,
  },
  listContainer: {
    flex: 1,
    paddingTop: deviceHeight * 0.04,
  },
  themeDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuAnchor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: spacing.sm,
  },
});
