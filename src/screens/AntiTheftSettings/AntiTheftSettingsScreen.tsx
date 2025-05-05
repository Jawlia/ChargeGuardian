import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {Card, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppTheme from '../../services/hooks/useAppTheme';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateAntiTheftSettings} from '../../store/slices/settingsSlice';
import VolumeSlider from '../../components/VolumeSlider';
import {ringtones} from '../../config/ringtones';
import {RingtoneModal} from '../../components/RingtoneModal';

const AntiTheftSettingsScreen = () => {
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings.antiTheft);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [isChangeMode, setIsChangeMode] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);

  // For first-time setup
  useEffect(() => {
    if (!settings.password || settings.password === 0) {
      setShowPasswordModal(true);
      setIsChangeMode(false);
    }
  });

  const savePassword = () => {
    if (newPassword.length !== 4 || isNaN(Number(newPassword))) {
      Alert.alert('Error', 'Please enter a valid 4-digit number');
      return;
    }
    dispatch(updateAntiTheftSettings({password: Number(newPassword)}));
    setShowPasswordModal(false);
  };

  const handleChange = (field: keyof typeof settings, value: any) => {
    dispatch(updateAntiTheftSettings({[field]: value}));
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content>
          <Text style={styles.title}>{t('Anti-Theft Alarm')}</Text>
          <Text style={[styles.descriptionText, {color: colors.description}]}>
            Protect your phone from theft while charging. Alarm rings if
            unplugged — only your password can stop it.
          </Text>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="lock-alert" size={20} color={colors.primary} />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('Enable Alarm')}
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
                {t('Volume')}
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
                {t('Vibration')}
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
                {t('Repeat')}
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

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon
                name="form-textbox-password"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.sectionHeading, {color: colors.text}]}>
                {t('Password')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowPasswordModal(true);
                setIsChangeMode(true);
              }}>
              <Text style={{color: colors.primary, fontWeight: '600'}}>
                **** {t('Change')}
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Modal visible={showPasswordModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.card}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              {isChangeMode ? t('ChangePassword') : t('SetPassword')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {borderColor: colors.primary, color: colors.text},
              ]}
              placeholder={t('Enter4DigitPassword')}
              keyboardType="numeric"
              maxLength={4}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor={colors.outline}
            />
            <TouchableOpacity
              style={[styles.saveBtn, {backgroundColor: colors.primary}]}
              onPress={() => {
                if (newPassword.length !== 4 || isNaN(Number(newPassword))) {
                  Alert.alert(t('Error'), t('InvalidPasswordAlert'));
                  return;
                }

                dispatch(
                  updateAntiTheftSettings({password: Number(newPassword)}),
                );
                setShowPasswordModal(false);
                setNewPassword('');
              }}>
              <Text style={{color: '#fff'}}>
                {isChangeMode ? t('Update') : t('Save')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {fontSize: 14},
  ringtoneSelector: {marginTop: 16},
  ringtoneName: {fontSize: 12, marginTop: 4},
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {fontSize: 16, fontWeight: '600', marginBottom: 12},
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  saveBtn: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  //aaa
  descriptionText: {fontSize: 11, marginBottom: 16},

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
  limitedWidthBox: {maxWidth: '70%'},
  selectedRingtoneText: {
    fontWeight: '600',
  },
});
