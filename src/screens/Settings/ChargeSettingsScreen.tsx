import React from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  updateFullChargeAlarm,
  updateLowBatteryAlarm,
} from '../../store/slices/settingsSlice';
import useAppTheme from '../../services/hooks/useAppTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import VolumeSlider from '../../components/VolumeSlider';
import CustomStyledSlider from '../../components/CustomSlider';
import {width} from '../../utils/utils';

const ChargeSettingsScreen = ({route}: any) => {
  const {type} = route.params; // 'full' or 'low'
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const alarm = useAppSelector(state =>
    type === 'full'
      ? state.settings.fullChargeAlarm
      : state.settings.lowBatteryAlarm,
  );

  const handleChange = (field: string, value: any) => {
    const payload = {[field]: value};
    if (type === 'full') {
      dispatch(updateFullChargeAlarm(payload));
    } else {
      dispatch(updateLowBatteryAlarm(payload));
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <Text style={styles.title}>
            {type === 'full' ? t('fullChargeAlarm') : t('lowBatteryAlarm')}
          </Text>
          <Text style={[styles.descriptionText, {color: colors.description}]}>
            {t('chargeAlarmDetailedDesc')}
          </Text>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <IconFontAwesome
                size={16}
                name={'battery-full'}
                style={styles.leftIcon}
                color={colors.primary}
              />
              <Text style={styles.alarmTitle}>{t('enableAndSetAlarm')}</Text>
            </View>

            <Switch
              value={alarm.isEnabled}
              onValueChange={val => handleChange('isEnabled', val)}
              thumbColor={alarm.isEnabled ? colors.primary : colors.outline}
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>

          <View style={styles.sliderWrap}>
            <CustomStyledSlider
              isType2={true}
              header={t('fullChargeAlarm')}
              subHeader={t(
                type === 'full' ? 'fullChargeAlarmDesc' : 'lowBatteryAlarmDesc',
              )}
              steps={
                type === 'full'
                  ? [60, 70, 80, 90, 100]
                  : [0, 10, 20, 30, 40, 50]
              }
              sliderMinValue={type === 'full' ? 60 : 0}
              sliderMaxValue={type === 'full' ? 100 : 50}
              isAlarmOn={alarm.isEnabled}
              setAlarm={val =>
                dispatch(
                  type === 'full'
                    ? updateFullChargeAlarm({isEnabled: val})
                    : updateLowBatteryAlarm({isEnabled: val}),
                )
              }
              alarmValue={alarm.alarmValue}
              setAlarmValue={val =>
                type === 'full'
                  ? dispatch(updateFullChargeAlarm({alarmValue: val}))
                  : dispatch(updateLowBatteryAlarm({alarmValue: val}))
              }
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <TouchableOpacity style={styles.rowBetweenSubCard}>
            <View style={styles.limitedWidthBox}>
              <View style={styles.rowLeft}>
                <Icon
                  name="bell-ring-outline"
                  size={20}
                  color={colors.iconGeneral}
                />
                <Text style={styles.label}>{t('ringtone')}</Text>
              </View>
              <Text
                style={[styles.descriptionText, {color: colors.description}]}>
                {t('ringtoneDesc')}
              </Text>
            </View>
            <View style={styles.ringtoneBox}>
              <Text style={[styles.optionText, {color: colors.description}]}>
                {alarm.ringtone}
              </Text>
              <Icon name="chevron-right" size={20} color={colors.description} />
            </View>
          </TouchableOpacity>

          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="volume-high" size={20} color={colors.iconGeneral} />
              <Text style={styles.label}>{t('volume')}</Text>
            </View>
            <VolumeSlider
              value={alarm.volume}
              onValueChange={val => handleChange('volume', val)}
              color={colors.primary}
            />
          </View>

          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="vibrate" size={20} color={colors.iconGeneral} />
              <Text style={styles.label}>{t('vibration')}</Text>
            </View>
            <Switch
              value={alarm.vibration}
              onValueChange={val => handleChange('vibration', val)}
              thumbColor={alarm.vibration ? colors.primary : colors.outline}
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <View style={styles.rowBetweenSubCard}>
            <View>
              <View style={styles.rowLeft}>
                <Icon name="repeat" size={20} color={colors.iconGeneral} />
                <Text style={styles.label}>{t('repeatAlert')}</Text>
              </View>
              <Text
                style={[styles.descriptionText, {color: colors.description}]}>
                {t('repeatAlertDesc', {
                  type: type === 'full' ? 'unplugged' : 'plugged',
                })}
              </Text>
            </View>
            <Switch
              value={alarm.repeat}
              onValueChange={val => handleChange('repeat', val)}
              thumbColor={alarm.repeat ? colors.primary : colors.outline}
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ChargeSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rowBetweenSubCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    marginLeft: 8,
  },
  ringtoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alarmTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 11,
    marginBottom: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sliderWrap: {
    marginBottom: -30,
  },
  leftIcon: {
    marginRight: 6,
  },
  limitedWidthBox: {
    maxWidth: '70%',
  },
});
