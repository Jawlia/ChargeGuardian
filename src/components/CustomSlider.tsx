import React from 'react';
import {spacing} from '../themes/themes';
import {Text, Switch} from 'react-native-paper';
import useAppTheme from '../services/hooks/useAppTheme';
import {Slider} from '@miblanchard/react-native-slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

type CustomStyledSliderProps = {
  header: string;
  isType2?: boolean;
  alarmValue: number;
  subHeader?: string;
  isAlarmOn: boolean;
  steps: Array<number>;
  sliderMinValue: number;
  sliderMaxValue: number;
  setAlarm: (val: boolean) => void;
  setAlarmValue: (val: number) => void;
};

const CustomStyledSlider = (props: CustomStyledSliderProps) => {
  const {colors} = useAppTheme();

  const onValueChange = (val: number[]) => {
    props.setAlarmValue(val[0]);
  };

  const toggleSwitch = () => props.setAlarm(!props.isAlarmOn);

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      {/* Row with Label and Switch */}
      {props?.isType2 ? null : (
        <View style={styles.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.alarmTitle,
                {
                  color: props.isAlarmOn
                    ? colors.onSurface
                    : colors.onSurfaceDisabled,
                },
              ]}>
              {props.header}
            </Text>
          </View>
          <Switch
            value={props.isAlarmOn}
            onValueChange={toggleSwitch}
            thumbColor={props.isAlarmOn ? colors.primary : colors.outline}
            trackColor={{false: colors.outline, true: colors.primaryContainer}}
          />
        </View>
      )}

      {props?.subHeader && !props?.isType2 && (
        <Text
          style={[
            styles.alarmSubtitle,
            {color: props.isAlarmOn ? colors.onSurfaceVariant : colors.outline},
          ]}>
          {props.subHeader}
        </Text>
      )}

      {/* Steps */}
      <View style={styles.labels}>
        {props.steps.map(step => (
          <TouchableOpacity
            key={step}
            disabled={!props.isAlarmOn}
            onPress={() => props.setAlarmValue(step)}>
            <Text
              style={[
                styles.stepLabel,
                {
                  color:
                    Math.round(props.alarmValue) === step
                      ? colors.trackColor
                      : colors.outline,
                  fontWeight:
                    Math.round(props.alarmValue) === step ? 'bold' : 'normal',
                },
              ]}>
              {step}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Slider */}
      <Slider
        value={props.alarmValue}
        onValueChange={onValueChange}
        minimumValue={props.sliderMinValue}
        maximumValue={props.sliderMaxValue}
        step={1}
        trackStyle={styles.track}
        minimumTrackTintColor={
          props.isAlarmOn ? colors.trackColor : colors.outline
        }
        maximumTrackTintColor={colors.outlineVariant}
        thumbTintColor={props.isAlarmOn ? colors.primary : colors.outline}
        thumbStyle={{
          ...styles.thumb,
          borderColor: colors.background,
        }}
        disabled={!props.isAlarmOn}
      />

      {/* Value */}

      <Text
        style={[
          styles.valueText,
          {color: props.isAlarmOn ? colors.primary : colors.outline},
        ]}>
        Alert at {Math.round(props.alarmValue)}%
      </Text>
    </View>
  );
};

export default CustomStyledSlider;

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    elevation: 2,
    shadowRadius: 4,
    marginBottom: spacing.lg,
    borderRadius: 16,
    shadowOpacity: 0.1,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 1},
  },
  row: {
    marginTop: spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginBottom: 6,
  },
  stepLabel: {
    fontSize: 13,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  track: {
    height: 4,
    borderRadius: 8,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  valueText: {
    fontSize: 12,
    marginLeft: spacing.xs,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 8,
  },
  valueTextRight: {
    fontSize: 12,
    marginLeft: spacing.xs,
    textAlign: 'right',
    fontWeight: '600',
    marginTop: -10,
  },
  alarmTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  alarmSubtitle: {
    fontSize: 12,
    marginBottom: spacing.sm,
  },
});
