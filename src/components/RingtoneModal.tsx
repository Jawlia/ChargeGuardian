import React, {useState} from 'react';
import {
  NativeModules,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppTheme from '../services/hooks/useAppTheme';
import {useTranslation} from 'react-i18next';

type RingtoneModalPramas = {
  alarm: any;
  ringtones: Array<any>;
  handleChangeRingtone: any
  showRingtoneModal: boolean
  setShowRingtoneModal: any
};

export const RingtoneModal = (props: RingtoneModalPramas) => {
  const {BatteryModule} = NativeModules;
//   const [showRingtoneModal, setShowRingtoneModal] = useState(false);
  const [tempSelectedTone, setTempSelectedTone] = useState(
    props?.alarm?.ringtone,
  );
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  return (
    <Portal>
      <Modal
        visible={props?.showRingtoneModal}
        onDismiss={() => props?.setShowRingtoneModal(false)}
        contentContainerStyle={[
          styles.ringtoneModal,
          {backgroundColor: colors.card},
        ]}>
        <Text style={[styles.modalTitle, {color: colors.text}]}>
          {t('selectRingtone')}
        </Text>

        <View style={styles.divider} />

        <ScrollView style={{maxHeight: 400}}>
          {props?.ringtones.map((tone, index) => (
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
            onPress={() => props?.setShowRingtoneModal(false)}
            labelStyle={{fontWeight: '600'}}
            textColor={colors.outline}>
            {t('cancel')}
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              props?.handleChangeRingtone('ringtone', tempSelectedTone);
              props?.setShowRingtoneModal(false);
            }}
            labelStyle={{fontWeight: '600'}}
            textColor={'white'}>
            {t('select')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  ringtoneModal: {padding: 20, margin: 20, borderRadius: 16},

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
