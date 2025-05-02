import {MD3LightTheme, MD3DarkTheme, useTheme} from 'react-native-paper';

export type themeColorType = typeof MD3LightTheme.colors & {
  primaryDark: string;
  heatAlert: string;
  greenHealth: string;
  batteryCapecity: string;
  modalCardBg1: string;
  modalCardLeftBorder1: string;
  modalCardBg2: string;
  modalCardLeftBorder2: string;
  modalCardHeading: string;
  modalCardDesc: string;
  modalBackground: string;
  badgeBackground: string;
  badgeText: string;
  menuColor: string;
  heraderInfoIcon: string;
  trackColor: string;
  disabledBadgeBackground: string;
  disabledBadgeText: string;
  card: string;
  disabledText: string;
};

interface ThemeBase {
  colors: themeColorType;
  spacing: typeof spacing;
}

const customColors = {
  primary: '#505ECE',
  secondary: '#FF9800',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceDark: '#1E1E1E',
  text: '#000000',
  textDark: '#FFFFFF',
  accent: '#03DAC6',
  danger: '#F44336',
  success: '#4CAF50',
  info: '#2196F3',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  uxl: 60,
};

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
    background: customColors.background,
    surface: customColors.surface,
    text: customColors.text,
    primaryDark: '#262C39',
    heatAlert: '#F44336',
    greenHealth: '#4CAF50',
    batteryCapecity: '#FFC107',

    //done
    modalCardBg1: '#EEF2FF',
    modalCardLeftBorder1: '#505ECE',
    modalCardBg2: '#F0FDF4',
    modalCardLeftBorder2: '#4CAF50',
    modalCardHeading: '#262C39',
    modalCardDesc: '#555',
    modalBackground: '#FFFFFF',
    badgeBackground: '#E0F2F1',
    badgeText: '#2E7D32',
    menuColor: '#000',
    heraderInfoIcon: customColors?.primary,
    trackColor: customColors?.primary,
    disabledBadgeBackground: '#B0B0B0',
    disabledBadgeText: '#f8f8f8',
    card: '#FFFFFF',
    warning: 'rgb(237, 215, 95)',
    description: 'rgba(0,0,0,0.4)',
    iconFull: '#4CAF50',
    iconLow: '#F44336',
    iconTheft: '#FFEB3B',
    iconTemp: '#FF5722',
    iconGeneral: '#4763f7',
    disabledText: 'rgba(0, 0, 0, 0.4)',
  },
  fonts: MD3LightTheme.fonts, // 👈 ADD THIS LINE
  spacing,
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
    background: '#121212',
    surface: customColors.surfaceDark,
    text: customColors.textDark,
    primaryDark: '#262C39',
    heatAlert: '#F44336',
    greenHealth: '#4CAF50',
    batteryCapecity: '#FFC107',

    //done
    modalCardBg1: '#2D2F41',
    modalCardLeftBorder1: '#7A86C1',
    modalCardBg2: '#2E4D2F',
    modalCardLeftBorder2: '#66BB6A',
    modalCardHeading: '#FFFFFF',
    modalCardDesc: '#CCCCCC',
    modalBackground: '#1E1E1E',
    badgeBackground: '#2E2E2E',
    badgeText: '#66BB6A',
    menuColor: '#f8f8f8',
    heraderInfoIcon: '#f8f8f8',
    trackColor: '#f8f8f8',
    disabledBadgeBackground: '#B0B0B0',
    disabledBadgeText: '#f8f8f8',
    card: '#1E1E1E',
    warning: '#f1e08a',
    description: 'rgba(255,255,255,0.5)',
    iconFull: '#505ECE',
    iconLow: '#505ECE',
    iconTheft: '#505ECE',
    iconTemp: '#505ECE',
    iconGeneral: '#505ECE',
    disabledText: 'rgba(255, 255, 255, 0.4)',
  },
  fonts: MD3DarkTheme.fonts,

  spacing,
};

export type AppTheme = ThemeBase;
