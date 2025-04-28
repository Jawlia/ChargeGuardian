import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {spacing} from '../themes/themes';
import {useTranslation} from 'react-i18next';
import {toggleTheme} from '../store/slices/themeSlice';
import useAppTheme from '../services/hooks/useAppTheme';
import {Text, Avatar, Switch} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import {height as deviceHeight} from '../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const getDrawerIcon = (
  {color, size}: {color: string; size: number},
  iconName: string,
) => <MaterialIcons name={iconName} size={size} color={color} />;

const CustomDrawerContent = (props: any) => {
  const {t} = useTranslation();
  const {height} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isDark = useAppSelector(state => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

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
          <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
            <MaterialIcons name="weather-night" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>Emma</Text>
        <Text style={styles.phone}>+91 9876543210</Text>
      </View>

      {/*  Drawer Items */}
      <View style={styles.listContainer}>
        <DrawerItemList {...props} />

        <View style={styles.themeToggle}>
          <Text style={styles.label}>{t('darkMode')}</Text>
          <Switch
            value={isDark}
            onValueChange={(value: boolean) => {
              dispatch(toggleTheme());
            }}
          />
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
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  label: {
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: spacing.sm,
  },
});
