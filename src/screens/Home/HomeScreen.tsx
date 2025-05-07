import {spacing} from '../../themes/themes';
import {useTranslation} from 'react-i18next';
import React, {useLayoutEffect, useState} from 'react';
import CustomSlider from '../../components/CustomSlider';
import {View, ScrollView, StyleSheet} from 'react-native';
import useAppTheme from '../../services/hooks/useAppTheme';
import {Text, Card, Portal, Modal} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useBatteryStatus from '../../services/hooks/useBatteryStatus';
import BatteryLottieGauge from '../../components/BatteryLottieGauge';
import {
  updateFullChargeAlarm,
  updateLowBatteryAlarm,
} from '../../store/slices/settingsSlice';

const BatteryInfoCard = ({
  icon,
  label,
  value,
  color,
  position,
  colors,
}: any) => (
  <View
    style={[
      styles.infoCardWrapper,
      {alignItems: position % 2 ? 'flex-start' : 'flex-end'},
    ]}>
    <View style={styles.infoCard}>
      <View style={styles.infoCardRow}>
        <Icon name={icon} size={14} color={color} style={styles.infoIcon} />
        <Text style={[styles.infoLabel, {color: colors.onSurfaceVariant}]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.infoValue, {color: colors.text}]}>{value}</Text>
    </View>
  </View>
);

const getTemperatureStatus = (temp: number, t: any): string => {
  if (temp < 10) return t('low');
  if (temp > 40) return t('high');
  return t('normal');
};

const HomeScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {colors, isDark} = useAppTheme();
  const [showTips, setShowTips] = useState(false);

  const {
    isCharging,
    batteryLevel,
    batteryTemprature,
    batteryHealth,
    batteryCapecity,
    batteryTechnology,
  } = useAppSelector(state => state.battery);

  const fullAlarm = useAppSelector(
    state => state.settings.fullChargeAlarm || {},
  );
  const lowAlarm = useAppSelector(
    state => state.settings.lowBatteryAlarm || {},
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="information-outline"
          size={24}
          color={colors.heraderInfoIcon}
          style={styles.headerIcon}
          onPress={() => setShowTips(true)}
        />
      ),
    });
  }, [navigation, isDark]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
      {/* Battery Status Card */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <View>
              <Text variant="titleMedium">{t('batteryStatus')}</Text>
              <Text variant="bodySmall">{t('currentBatteryInfo')}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isCharging
                    ? colors.badgeBackground
                    : colors.disabledBadgeBackground,
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: isCharging
                      ? colors.badgeText
                      : colors.disabledBadgeText,
                  },
                ]}>
                {isCharging ? t('charging') : t('notCharging')}
              </Text>
            </View>
          </View>

          <View style={styles.batteryGauge}>
            <BatteryLottieGauge percentage={Math.round(batteryLevel * 100)} />
          </View>

          <View style={styles.infoGrid}>
            <BatteryInfoCard
              icon="thermometer"
              label={t('temperature')}
              value={`${Math.round(batteryTemprature)}°C (${getTemperatureStatus(batteryTemprature, t)})`}
              color={colors.heatAlert}
              position={1}
              colors={colors}
            />
            <BatteryInfoCard
              icon="heart-pulse"
              label={t('health')}
              value={t(`${batteryHealth?.replace(/\s+/g, '')?.toLowerCase()}`)}
              color={colors.greenHealth}
              position={2}
              colors={colors}
            />
            <BatteryInfoCard
              icon="chip"
              label={t('technology')}
              value={t(
                `${batteryTechnology}`?.replace(/-/g, '')?.toLowerCase(),
              )}
              color={colors.primary}
              position={3}
              colors={colors}
            />
            <BatteryInfoCard
              icon="battery-charging-100"
              label={t('capacity')}
              value={`${batteryCapecity} ${t('mah')}`}
              color={colors.batteryCapecity}
              position={4}
              colors={colors}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Charging Alarms */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {t('chargingAlarm')}
          </Text>

          <CustomSlider
            header={t('fullChargeAlarm')}
            subHeader={t('fullChargeAlarmDesc')}
            steps={[60, 70, 80, 90, 100]}
            sliderMinValue={60}
            sliderMaxValue={100}
            isAlarmOn={fullAlarm.isEnabled}
            setAlarm={val => dispatch(updateFullChargeAlarm({isEnabled: val}))}
            alarmValue={fullAlarm.alarmValue}
            setAlarmValue={val =>
              dispatch(updateFullChargeAlarm({alarmValue: val}))
            }
          />

          <CustomSlider
            header={t('lowBatteryAlarm')}
            subHeader={t('lowBatteryAlarmDesc')}
            steps={[0, 10, 20, 30, 40, 50]}
            sliderMinValue={0}
            sliderMaxValue={50}
            isAlarmOn={lowAlarm.isEnabled}
            setAlarm={val => dispatch(updateLowBatteryAlarm({isEnabled: val}))}
            alarmValue={lowAlarm.alarmValue}
            setAlarmValue={val =>
              dispatch(updateLowBatteryAlarm({alarmValue: val}))
            }
          />
        </Card.Content>
      </Card>

      {/* Tips Modal */}
      <Portal>
        <Modal
          visible={showTips}
          onDismiss={() => setShowTips(false)}
          contentContainerStyle={[
            styles.modalContainer,
            {backgroundColor: colors.background},
          ]}>
          <Icon
            name="close"
            size={24}
            color="#666"
            style={styles.modalCloseIcon}
            onPress={() => setShowTips(false)}
          />

          <Text variant="titleMedium" style={styles.modalTitle}>
            {t('batteryTips')}
          </Text>

          {/* First Tip Card */}
          <Card
            style={[styles.tipCard, {backgroundColor: colors.modalCardBg1}]}>
            <Card.Content
              style={[
                styles.tipContent,
                {borderLeftColor: colors.modalCardLeftBorder1},
              ]}>
              <Text
                style={[styles.tipHeading, {color: colors.modalCardHeading}]}>
                {t('optimalCharging')}
              </Text>
              <Text style={[styles.tipDesc, {color: colors.modalCardDesc}]}>
                {t('optimalChargingDesc')}
              </Text>
            </Card.Content>
          </Card>

          {/* Second Tip Card */}
          <Card
            style={[styles.tipCard, {backgroundColor: colors.modalCardBg2}]}>
            <Card.Content
              style={[
                styles.tipContent,
                {borderLeftColor: colors.modalCardLeftBorder2},
              ]}>
              <Text
                style={[styles.tipHeading, {color: colors.modalCardHeading}]}>
                {t('avoidOverHeat')}
              </Text>
              <Text style={[styles.tipDesc, {color: colors.modalCardDesc}]}>
                {t('avoidOverHeatDesc')}
              </Text>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxxl,
  },
  card: {
    marginBottom: spacing.lg,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: spacing.lg,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
  },
  batteryGauge: {
    marginTop: spacing.xl,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    paddingHorizontal: '5%',
  },
  infoCardWrapper: {
    width: '43%',
  },
  infoCard: {
    width: 100,
    marginBottom: spacing.md,
  },
  infoCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: -4,
    marginRight: spacing.xs,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modalContainer: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    position: 'relative',
  },
  modalCloseIcon: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  modalTitle: {
    marginBottom: spacing.md,
  },
  tipCard: {
    marginBottom: spacing.md,
  },
  tipContent: {
    borderLeftWidth: spacing.xs,
  },
  tipHeading: {
    fontWeight: 'bold',
  },
  tipDesc: {
    marginTop: spacing.xs,
    fontSize: 13,
  },
});
