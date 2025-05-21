import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppTheme from '../../services/hooks/useAppTheme';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateAntiTheftSettings} from '../../store/slices/settingsSlice';
import VolumeSlider from '../../components/VolumeSlider';
import {ringtones} from '../../config/ringtones';
import {RingtoneModal} from '../../components/RingtoneModal';
import PasswordModal from './PasswordModal';
import {useNavigation} from '@react-navigation/native';

const AntiTheftSettingsScreen = () => {
  const {colors} = useAppTheme();
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const settings = useAppSelector(state => state.settings.antiTheft);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    if (!settings.password || settings.password === 0) {
      setShowPasswordModal(true);
      setIsChangeMode(false);
    }
  }, [settings.password]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field: keyof typeof settings, value: any) => {
    setLocalSettings(prev => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    dispatch(updateAntiTheftSettings(localSettings));
    ToastAndroid.show(
      t('antiTheftSettingsUpdated') || 'Anti-Theft settings updated!',
      ToastAndroid.SHORT,
    );
    navigation.goBack();
  };

  const filteredRingtones = ringtones?.filter(
    r =>
      !r.labelKey?.includes('battery_full') &&
      !r.labelKey?.includes('battery_low'),
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <Text style={[styles.title, {color: colors.text}]}>
            {t('antiTheftTitle')}
          </Text>
          <Text style={[styles.descriptionText, {color: colors.description}]}>
            {t('antiTheftDescription')}
          </Text>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="lock-alert" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('enableAlarm')}
              </Text>
            </View>
            <Switch
              value={localSettings.isEnabled}
              onValueChange={val => handleChange('isEnabled', val)}
              thumbColor={
                localSettings.isEnabled ? colors.primary : colors.outline
              }
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="volume-high" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('volume')}
              </Text>
            </View>
            <VolumeSlider
              value={localSettings.volume}
              onValueChange={val => handleChange('volume', val)}
              color={colors.primary}
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="vibrate" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('vibration')}
              </Text>
            </View>
            <Switch
              value={localSettings.vibration}
              onValueChange={val => handleChange('vibration', val)}
              thumbColor={
                localSettings.vibration ? colors.primary : colors.outline
              }
              trackColor={{
                false: colors.outline,
                true: colors.primaryContainer,
              }}
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="repeat" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('repeat')}
              </Text>
            </View>
            <Switch
              value={localSettings.repeat}
              onValueChange={val => handleChange('repeat', val)}
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
                style={[
                  styles.descriptionText,
                  {color: colors.description, marginBottom: 0},
                ]}>
                {t('antiTheftRingtoneDesc')}{' '}
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
        </Card.Content>
      </Card>

      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <View style={styles.rowBetweenSmall}>
            <View style={styles.rowLeft}>
              <Icon name="key-variant" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('password')}
              </Text>
            </View>

            <View style={styles.passwordBox}>
              <Text
                style={{color: colors.text, fontWeight: '600', marginRight: 6}}>
                {isPasswordVisible
                  ? localSettings.password.toString()
                  : '•'.repeat(localSettings.password.toString().length)}
              </Text>

              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 12}}
                onPress={() => {
                  setShowPasswordModal(true);
                  setIsChangeMode(true);
                }}>
                <Icon name="pencil" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[
              styles.descriptionText,
              {color: colors.description, marginBottom: 0},
            ]}>
            {t('antiTheftPasswordDesc')}
          </Text>
        </Card.Content>
      </Card>

      <PasswordModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={pass =>
          dispatch(updateAntiTheftSettings({password: Number(pass)}))
        }
        initialPassword={settings.password.toString()}
        mode={isChangeMode ? 'edit' : 'set'}
        title={isChangeMode ? t('updatePasswordTitle') : t('setPasswordTitle')}
      />

      <RingtoneModal
        alarm={localSettings}
        ringtones={filteredRingtones}
        handleChangeRingtone={handleChange}
        showRingtoneModal={showRingtoneModal}
        setShowRingtoneModal={setShowRingtoneModal}
      />

      <TouchableOpacity style={{marginVertical: 20}} onPress={handleSave}>
        <View style={[styles.saveButton, {backgroundColor: colors.primary}]}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{t('save')}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AntiTheftSettingsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  card: {borderRadius: 16, marginBottom: 20},
  title: {fontSize: 16, fontWeight: 'bold'},
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  rowBetweenSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descriptionText: {fontSize: 11, marginBottom: 16},
  rowBetweenSubCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom: 2,
  },
  limitedWidthBox: {maxWidth: '70%'},
  selectedRingtoneText: {fontWeight: '600'},
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});
