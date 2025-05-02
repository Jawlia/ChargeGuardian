import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppTheme from '../../services/hooks/useAppTheme';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../hooks/hooks';

const SettingsScreen = ({navigation}: any) => {
  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const fullAlarm = useAppSelector(
    state => state.settings.fullChargeAlarm || {},
  );
  const lowAlarm = useAppSelector(
    state => state.settings.lowBatteryAlarm || {},
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={[styles.card, {backgroundColor: colors.card}]}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Charge Alarm Settings</Text>
            <Text style={[styles.descriptionText, {color: colors.description}]}>
              Manage full and low battery alerts, customize tones, and control
              how your device notifies you when charge levels change.
            </Text>
            <TouchableOpacity
              style={styles.settingBlock}
              onPress={() =>
                navigation.navigate('ChargeSettings', {
                  type: 'full',
                })
              }>
              <View style={styles.optionRow}>
                <View style={styles.rowLeft}>
                  <Icon
                    size={16}
                    name={'battery-full'}
                    color={colors.iconFull}
                  />
                  <Text style={styles.label}>{t('fullChargeAlarm')}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text
                    style={[styles.optionText, {color: colors.description}]}>
                    {fullAlarm.isEnabled ? 'On' : 'Off'}
                  </Text>
                  <IconMaterial
                    name="chevron-right"
                    size={20}
                    color={colors.description}
                  />
                </View>
              </View>
              {fullAlarm.isEnabled && (
                <Text style={[styles.optionText, {color: colors.description}]}>
                  Alert at battery level: {fullAlarm.alarmValue}%
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingBlock}
              onPress={() =>
                navigation.navigate('ChargeSettings', {
                  type: 'low',
                })
              }>
              <View style={styles.optionRow}>
                <View style={styles.rowLeft}>
                  <Icon
                    size={16}
                    name={'battery-quarter'}
                    color={colors.iconLow}
                  />
                  <Text style={styles.label}>{t('lowBatteryAlarm')}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text
                    style={[styles.optionText, {color: colors.description}]}>
                    {lowAlarm.isEnabled ? 'On' : 'Off'}
                  </Text>
                  <IconMaterial
                    name="chevron-right"
                    size={20}
                    color={colors.description}
                  />
                </View>
              </View>
              {lowAlarm.isEnabled && (
                <Text style={[styles.optionText, {color: colors.description}]}>
                  Alert at battery level: {lowAlarm.alarmValue}%
                </Text>
              )}
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Card style={[styles.card, {backgroundColor: colors.card}]}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Anti-Theft Alarm</Text>
            <Text style={[styles.descriptionText, {color: colors.description}]}>
              Enable theft protection to trigger a loud alarm if your phone is
              unplugged while charging — only your secure password can stop it.
            </Text>
            <TouchableOpacity
              style={styles.settingBlock}
              onPress={() => navigation.navigate('AntiTheftSettings')}>
              <View style={styles.optionRow}>
                <View style={styles.rowLeft}>
                  <IconMaterial
                    name="shield-lock"
                    size={20}
                    color={colors.iconTheft}
                  />
                  <Text style={styles.label}>Anti Theft Alarm</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text
                    style={[styles.optionText, {color: colors.description}]}>
                    On
                  </Text>
                  <IconMaterial
                    name="chevron-right"
                    size={16}
                    color={colors.description}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Card style={[styles.card, {backgroundColor: colors.card}]}>
          <Card.Content>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => navigation.navigate('ThemeSettings')}>
              <View style={styles.rowLeft}>
                <IconMaterial
                  name="theme-light-dark"
                  size={20}
                  color={colors.iconGeneral}
                />
                <Text style={styles.label}>Theme</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={[styles.optionText, {color: colors.description}]}>
                  Light
                </Text>
                <IconMaterial
                  name="chevron-right"
                  size={20}
                  color={colors.description}
                />
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Card style={[styles.card, {backgroundColor: colors.card}]}>
          <Card.Content>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => navigation.navigate('LanguageSettings')}>
              <View style={styles.rowLeft}>
                <IconMaterial
                  name="translate"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.label}>Language</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={[styles.optionText, {color: colors.description}]}>
                  English
                </Text>
                <IconMaterial
                  name="chevron-right"
                  size={20}
                  color={colors.description}
                />
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Card style={[styles.card, {backgroundColor: colors.card}]}>
          <Card.Content>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => navigation.navigate('LanguageSettings')}>
              <View style={styles.rowLeft}>
                <IconMaterial
                  name="coolant-temperature"
                  size={20}
                  color={colors.iconTemp}
                />
                <Text style={styles.label}>Temperature Unit</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={[styles.optionText, {color: colors.description}]}>
                  °C
                </Text>
                <IconMaterial
                  name="chevron-right"
                  size={20}
                  color={colors.description}
                />
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={[styles.proContainer, {backgroundColor: colors.primary}]}>
        <View>
          <Text style={styles.proTitle}>Unlock Pro Features</Text>
          <Text style={styles.proSubtitle}>
            No ads, Auto start, Custom Alarm tones
          </Text>
        </View>
        <TouchableOpacity style={styles.proButton}>
          <Text style={styles.proButtonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 11,
    marginBottom: 12,
  },
  settingBlock: {
    marginTop: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
  optionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  proContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  proSubtitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  proButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  proButtonText: {
    color: '#4763f7',
    fontWeight: '600',
    fontSize: 13,
  },
});
