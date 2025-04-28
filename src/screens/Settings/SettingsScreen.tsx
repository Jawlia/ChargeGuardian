import React from 'react';
import {spacing} from '../../themes/themes';
import {Slider} from '@miblanchard/react-native-slider';
import {ScrollView, View, StyleSheet} from 'react-native';
import useAppTheme from '../../services/hooks/useAppTheme';
import {Text, Card, Switch, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const {colors} = useAppTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
      {/* Alarm Settings Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Alarm Settings
          </Text>

          {/* Full Charge Alarm */}
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons
                name="battery-charging-100"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Full Charge Alarm
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <Slider
            value={90}
            minimumValue={80}
            maximumValue={100}
            step={1}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.outlineVariant}
            thumbTintColor={colors.primary}
          />
          <Text style={[styles.sliderValue, {color: colors.primary}]}>90%</Text>

          {/* Low Battery Alarm */}
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons
                name="battery-alert"
                size={20}
                color={colors.error}
              />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Low Battery Alarm
              </Text>
            </View>
            <Switch value={false} onValueChange={() => {}} />
          </View>

          <Slider
            value={20}
            minimumValue={5}
            maximumValue={30}
            step={1}
            minimumTrackTintColor={colors.error}
            maximumTrackTintColor={colors.outlineVariant}
            thumbTintColor={colors.error}
          />
          <Text style={[styles.sliderValue, {color: colors.error}]}>20%</Text>
        </Card.Content>
      </Card>

      {/* Notification Settings Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Notification Settings
          </Text>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="bell" size={20} color={colors.primary} />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Ringtone
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons
                name="volume-high"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Volume
              </Text>
            </View>
          </View>
          <Slider
            value={50}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.outlineVariant}
            thumbTintColor={colors.primary}
          />

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="vibrate" size={20} color={colors.primary} />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Vibration
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="refresh" size={20} color={colors.primary} />
              <Text style={[styles.label, {marginLeft: spacing.sm}]}>
                Repeat Alert
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </Card.Content>
      </Card>

      {/* Pro Features Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Pro Features
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Auto-start on device reboot</Text>
            <Button mode="text" compact onPress={() => {}}>
              Upgrade
            </Button>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Advanced battery analytics</Text>
            <Button mode="text" compact onPress={() => {}}>
              Upgrade
            </Button>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Remove ads</Text>
            <Button mode="text" compact onPress={() => {}}>
              Upgrade
            </Button>
          </View>

          <Button mode="contained" style={styles.proButton}>
            View Pro Plans
          </Button>
        </Card.Content>
      </Card>

      {/* App Settings Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            App Settings
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Language</Text>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={[styles.label, {color: colors.error}]}>
              Clear Data
            </Text>
            <MaterialIcons name="delete" size={20} color={colors.error} />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
    borderRadius: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  sliderValue: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: spacing.sm,
  },
  proButton: {
    marginTop: spacing.lg,
    borderRadius: 8,
  },
});
