import React from 'react';
import {spacing} from '../themes/themes';
import {useTranslation} from 'react-i18next';
import useAppTheme from '../services/hooks/useAppTheme';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, StyleSheet, useWindowDimensions} from 'react-native';

const GetStartedScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const {width, height} = useWindowDimensions();
  const {colors} = useAppTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.topContent, {paddingTop: height * 0.2}]}>
        <Text style={[styles.title, {color: colors.primary}]}>
          {t('appName')}
        </Text>

        <Avatar.Icon
          size={Math.min(width * 0.4, 140)}
          icon="flash"
          color={colors.onPrimary}
          style={[styles.flashIcon, {backgroundColor: colors.primary}]}
        />

        <Text style={[styles.subtitle, {color: colors.onSurfaceVariant}]}>
          {t('getStartedDesc')}
        </Text>
      </View>

      <View style={styles.spacer} />

      <Button
        mode="contained"
        onPress={() => navigation.replace('Main', {screen: 'Home'})}
        style={[styles.button, {backgroundColor: colors.primary}]}
        contentStyle={styles.buttonContent}
        labelStyle={[styles.buttonLabel, {color: colors.onPrimary}]}>
        {t('getStarted')}
      </Button>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContent: {
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.xxl,
    fontSize: 24,
    fontWeight: 'bold',
  },
  flashIcon: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 20,
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
});
