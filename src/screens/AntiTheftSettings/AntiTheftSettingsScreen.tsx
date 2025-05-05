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

const AntiTheftSettingsScreen = () => {
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings.antiTheft);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);

  useEffect(() => {
    if (!settings.password || settings.password === 0) {
      setShowPasswordModal(true);
    }
  }, []);

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

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Icon name="lock-alert" size={20} color={colors.primary} />
              <Text style={styles.label}>{t('Enable Alarm')}</Text>
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
              <Text style={styles.label}>{t('Volume')}</Text>
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
              <Text style={styles.label}>{t('Vibration')}</Text>
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
              <Text style={styles.label}>{t('Repeat')}</Text>
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
            onPress={() => setShowRingtoneModal(true)}
            style={styles.ringtoneSelector}>
            <Text style={[styles.label, {color: colors.primary}]}>
              {t('Ringtone')}
            </Text>
            <Text style={[styles.ringtoneName, {color: colors.text}]}>
              {t(settings.ringtone)}
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Modal visible={showPasswordModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.card}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Set 4-digit Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {borderColor: colors.primary, color: colors.text},
              ]}
              placeholder="Enter password"
              keyboardType="numeric"
              maxLength={4}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor={colors.outline}
            />
            <TouchableOpacity
              style={[styles.saveBtn, {backgroundColor: colors.primary}]}
              onPress={savePassword}>
              <Text style={{color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
          {ringtones.map((tone, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ringtoneOption}
              onPress={() => {
                handleChange('ringtone', tone.labelKey);
                setShowRingtoneModal(false);
              }}>
              <Text style={[styles.ringtoneText, {color: colors.text}]}>
                {t(tone.labelKey)}
              </Text>
              {settings.ringtone === tone.labelKey && (
                <Icon name="check" size={16} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Modal>
      </Portal>
    </View>
  );
};

export default AntiTheftSettingsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  card: {borderRadius: 16, marginBottom: 20},
  title: {fontSize: 16, fontWeight: 'bold', marginBottom: 12},
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
  ringtoneModal: {
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  ringtoneOption: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ringtoneText: {
    fontSize: 14,
  },
});
