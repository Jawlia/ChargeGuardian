import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';
import useAppTheme from '../../services/hooks/useAppTheme';
import {useTranslation} from 'react-i18next';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
  title?: string;
  initialPassword?: string;
  mode?: 'set' | 'edit';
}

const PasswordModal = ({
  visible,
  onClose,
  onSave,
  title,
  initialPassword = '',
  mode = 'set',
}: Props) => {
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSave = () => {
    if (password.length === 4 && !isNaN(Number(password))) {
      onSave(password);
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, {backgroundColor: colors.card}]}>
          {mode === 'edit' && (
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Icon name="close" size={20} color={colors.text} />
            </TouchableOpacity>
          )}

          <View style={styles.headerRow}>
            <Text style={[styles.title, {color: colors.text}]}>
              {title || t('set4DigitPassword')}
            </Text>
            <Tooltip
              isVisible={showTooltip}
              content={
                <Text style={{color: 'rgba(0,0,0,0.5)', fontSize: 12}}>
                  {t('passwordTooltip')}
                </Text>
              }
              placement="bottom"
              onClose={() => setShowTooltip(false)}>
              <TouchableOpacity onPress={() => setShowTooltip(true)}>
                <Icon
                  name="information-outline"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Tooltip>
          </View>

          <Text style={[styles.subtitle, {color: colors.description}]}>
            {t('passwordDescription')}
          </Text>

          <View
            style={[
              styles.inputWrapper,
              {
                borderColor: colors.outline,
                backgroundColor: colors.background,
              },
            ]}>
            <Icon name="lock-outline" size={20} color={colors.outline} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={!showPassword}
              placeholder={t('enterPassword')}
              placeholderTextColor={colors.outline}
              style={[styles.input, {color: colors.text}]}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.outline}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            {mode === 'edit' && (
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btn, {backgroundColor: colors.surface}]}>
                <Text style={[styles.btnText, {color: colors.primary}]}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.btn, {backgroundColor: colors.primary}]}>
              <Text style={[styles.btnText, {color: '#fff'}]}>
                {t('accept')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 24,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
