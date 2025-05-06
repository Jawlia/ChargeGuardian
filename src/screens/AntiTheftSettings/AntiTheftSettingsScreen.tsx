import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
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

const AntiTheftSettingsScreen = () => {
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings.antiTheft);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);

  useEffect(() => {
    if (!settings.password || settings.password === 0) {
      setShowPasswordModal(true);
      setIsChangeMode(false);
    }
  }, [settings.password]);

  const handleChange = (field: keyof typeof settings, value: any) => {
    dispatch(updateAntiTheftSettings({[field]: value}));
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
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
              value={settings.isEnabled}
              onValueChange={val => handleChange('isEnabled', val)}
              thumbColor={settings.isEnabled ? colors.primary : colors.outline}
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
              value={settings.volume}
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
              value={settings.vibration}
              onValueChange={val => handleChange('vibration', val)}
              thumbColor={settings.vibration ? colors.primary : colors.outline}
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
              value={settings.repeat}
              onValueChange={val => handleChange('repeat', val)}
              thumbColor={settings.repeat ? colors.primary : colors.outline}
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
                  {t(settings.ringtone)}
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
                  ? settings.password.toString()
                  : '•'.repeat(settings.password.toString().length)}
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
        alarm={settings.ringtone}
        ringtones={ringtones}
        handleChangeRingtone={handleChange}
        showRingtoneModal={showRingtoneModal}
        setShowRingtoneModal={setShowRingtoneModal}
      />
    </View>
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
});
