import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  ScrollView,
  ToastAndroid,
} from 'react-native';
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
import {ringtones} from '../../config/ringtones';
import {RingtoneModal} from '../../components/RingtoneModal';
import {
  cancelBatteryAlarm,
  scheduleBatteryAlarm,
} from '../../services/scheduleAlarm';
import {useNavigation} from '@react-navigation/native';

const ChargeSettingsScreen = ({route, navigation}: any) => {
  const {type} = route.params;
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {BatteryModule} = NativeModules;
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);
  const nav = useNavigation();

  const alarm = useAppSelector(state =>
    type === 'full'
      ? state.settings.fullChargeAlarm
      : state.settings.lowBatteryAlarm,
  );

  const [localSettings, setLocalSettings] = useState(alarm);

  useEffect(() => {
    setLocalSettings(alarm);
  }, [alarm]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSaveSettings}
          style={{marginRight: 16}}>
          <Text style={{color: colors.primary, fontWeight: 'bold'}}>
            {t('save')}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, localSettings]);

  const handleLocalChange = (field: string, value: any) => {
    setLocalSettings(prev => ({...prev, [field]: value}));
  };

  const handleSaveSettings = () => {
    const payload = {...localSettings};
    if (type === 'full') {
      dispatch(updateFullChargeAlarm(payload));
      if (payload.isEnabled) {
        scheduleBatteryAlarm('full', payload.alarmValue);
      } else {
        cancelBatteryAlarm('full');
        BatteryModule.stopAlarm();
      }
    } else {
      dispatch(updateLowBatteryAlarm(payload));
      if (payload.isEnabled) {
        scheduleBatteryAlarm('low', payload.alarmValue);
      } else {
        cancelBatteryAlarm('low');
      }
    }

    ToastAndroid.show(
      `${type === 'full' ? 'Full' : 'Low'} alarm settings updated`,
      ToastAndroid.SHORT,
    );
    nav.goBack();
  };

  const filteredRingtones = ringtones?.filter(r =>
    type === 'full'
      ? !r.labelKey?.includes('battery_full') &&
        !r.labelKey?.includes('anti_theft')
      : !r.labelKey?.includes('battery_full') &&
        !r.labelKey?.includes('anti_theft'),
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Charge Slider */}
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <Text style={[styles.cardTitle, {color: colors.text}]}>
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
              <Text style={[styles.label, {color: colors.text}]}>
                {t('enableAndSetAlarm')}
              </Text>
            </View>
            <Switch
              value={localSettings.isEnabled}
              onValueChange={val => handleLocalChange('isEnabled', val)}
              thumbColor={
                localSettings.isEnabled ? colors.primary : colors.outline
              }
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
              // steps={
              //   type === 'full' ? [70, 80, 90, 100] : [0, 10, 20, 30, 50, 60]
              // }
              // sliderMinValue={type === 'full' ? 70 : 0}
              // sliderMaxValue={type === 'full' ? 100 : 60}
              isAlarmOn={localSettings.isEnabled}
              setAlarm={val => handleLocalChange('isEnabled', val)}
              alarmValue={localSettings.alarmValue}
              setAlarmValue={val => handleLocalChange('alarmValue', val)}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Ringtone Settings */}
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <TouchableOpacity
            style={styles.rowBetweenSubCard}
            onPress={() => setShowRingtoneModal(true)}>
            <View style={styles.limitedWidthBox}>
              <View style={styles.rowLeft}>
                <Icon
                  name="bell-ring-outline"
                  size={20}
                  color={colors.iconGeneral}
                />
                <Text style={[styles.sectionHeading, {color: colors.text}]}>
                  {t('ringtone')}
                </Text>
              </View>
              <Text
                style={[styles.descriptionText, {color: colors.description}]}>
                {t('ringtoneDesc')}{' '}
                <Text
                  style={[
                    styles.selectedRingtoneText,
                    {color: colors.primary},
                  ]}>
                  {t(localSettings.ringtone)}
                </Text>
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.description} />
          </TouchableOpacity>

          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="volume-high" size={20} color={colors.iconGeneral} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('volume')}
              </Text>
            </View>
            <VolumeSlider
              value={localSettings.volume}
              onValueChange={val => handleLocalChange('volume', val)}
              color={colors.primary}
            />
          </View>

          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="vibrate" size={20} color={colors.iconGeneral} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('vibration')}
              </Text>
            </View>
            <Switch
              value={localSettings.vibration}
              onValueChange={val => handleLocalChange('vibration', val)}
              thumbColor={
                localSettings.vibration ? colors.primary : colors.outline
              }
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Repeat Alert */}
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <View style={styles.rowBetweenSubCard}>
            <View>
              <View style={styles.rowLeft}>
                <Icon name="repeat" size={20} color={colors.iconGeneral} />
                <Text style={[styles.sectionHeading, {color: colors.text}]}>
                  {t('repeatAlert')}
                </Text>
              </View>
              <Text
                style={[styles.descriptionText, {color: colors.description}]}>
                {t('repeatAlertDesc', {
                  type: type === 'full' ? 'unplugged' : 'plugged',
                })}
              </Text>
            </View>
            <Switch
              value={localSettings.repeat}
              onValueChange={val => handleLocalChange('repeat', val)}
              thumbColor={
                localSettings.repeat ? colors.primary : colors.outline
              }
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>
        </Card.Content>
      </Card>

      <RingtoneModal
        alarm={localSettings}
        ringtones={filteredRingtones}
        handleChangeRingtone={handleLocalChange}
        showRingtoneModal={showRingtoneModal}
        setShowRingtoneModal={setShowRingtoneModal}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={{marginTop: 20, marginBottom: 120}}
        onPress={handleSaveSettings}>
        <View style={[styles.saveButton, {backgroundColor: colors.primary}]}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{t('save')}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChargeSettingsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  card: {borderRadius: 12, marginBottom: 20},
  title: {fontSize: 16, fontWeight: 'bold'},
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
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom: 2,
  },
  ringtoneBox: {flexDirection: 'row', alignItems: 'center', gap: 4},
  alarmTitle: {fontSize: 14, fontWeight: '600'},
  descriptionText: {fontSize: 11, marginBottom: 8},
  rowLeft: {flexDirection: 'row', alignItems: 'center'},
  optionText: {fontSize: 11, fontWeight: '600'},
  sliderWrap: {marginBottom: -30},
  leftIcon: {marginRight: 6},
  limitedWidthBox: {maxWidth: '70%'},
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedRingtoneText: {
    fontWeight: '600',
  },
  saveButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});
