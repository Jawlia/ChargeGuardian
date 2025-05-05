import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  ScrollView,
} from 'react-native';
import {Button, Card, Modal, Portal} from 'react-native-paper';
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

const ChargeSettingsScreen = ({route}: any) => {
  const {type} = route.params;
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {BatteryModule} = NativeModules;
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);

  const alarm = useAppSelector(state =>
    type === 'full'
      ? state.settings.fullChargeAlarm
      : state.settings.lowBatteryAlarm,
  );

  const [tempSelectedTone, setTempSelectedTone] = useState(alarm.ringtone);
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
                  {t(alarm.ringtone)}
                </Text>
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.description} />
          </TouchableOpacity>

          {/* Volume */}
          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="volume-high" size={20} color={colors.iconGeneral} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('volume')}
              </Text>
            </View>
            <VolumeSlider
              value={alarm.volume}
              onValueChange={val => handleChange('volume', val)}
              color={colors.primary}
            />
          </View>

          {/* Vibration */}
          <View style={styles.rowBetweenSubCard}>
            <View style={styles.rowLeft}>
              <Icon name="vibrate" size={20} color={colors.iconGeneral} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('vibration')}
              </Text>
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

      {/* Ringtone Modal */}
      <Portal>
        <Modal
          visible={showRingtoneModal}
          onDismiss={() => setShowRingtoneModal(false)}
          contentContainerStyle={[
            styles.ringtoneModal,
            {backgroundColor: colors.card},
          ]}>
          <Text style={[styles.modalTitle, {color: colors.text}]}>
            {t('selectRingtone')}
          </Text>

          <View style={styles.divider} />

          <ScrollView style={{maxHeight: 400}}>
            {ringtones.map((tone, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.ringtoneOption,
                  tempSelectedTone === tone.labelKey && {
                    backgroundColor: colors.primaryContainer,
                    borderRadius: 8,
                  },
                ]}
                onPress={() => {
                  setTempSelectedTone(tone.labelKey);
                  BatteryModule.playAlarm(tone.name);
                }}>
                <Text
                  style={[
                    styles.ringtoneText,
                    {
                      color: colors.text,
                    },
                  ]}>
                  {t(tone.labelKey)}
                </Text>
                {tempSelectedTone === tone.labelKey && (
                  <Icon name="check" size={16} color={colors.description} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <Button
              mode="contained-tonal"
              onPress={() => setShowRingtoneModal(false)}
              labelStyle={{fontWeight: '600'}}
              textColor={colors.outline}>
              {t('cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                handleChange('ringtone', tempSelectedTone);
                setShowRingtoneModal(false);
              }}
              labelStyle={{fontWeight: '600'}}
              textColor={'white'}>
              {t('select')}
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
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
  ringtoneModal: {padding: 20, margin: 20, borderRadius: 16},
  // modalTitle: {fontSize: 16, fontWeight: '600', marginBottom: 12},
  // ringtoneOption: {
  //   paddingVertical: 12,
  //   borderBottomWidth: 0.5,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // ringtoneText: {fontSize: 14},

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

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginBottom: 10,
  },
  ringtoneOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ringtoneText: {
    fontSize: 14,
  },
  modalCloseButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalActions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  modalActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
