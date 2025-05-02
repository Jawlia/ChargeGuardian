import React from 'react';
import {StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import useAppTheme from '../services/hooks/useAppTheme';
import {width} from '../utils/utils';

interface VolumeSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  color?: string;
}

const VolumeSlider = ({value, onValueChange, color}: VolumeSliderProps) => {
  const {colors} = useAppTheme();
  const iconColor = color || colors.primary;

  return (
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={1}
      step={0.1}
      value={value}
      minimumTrackTintColor={iconColor}
      maximumTrackTintColor={colors.outline}
      thumbTintColor={iconColor}
      onValueChange={onValueChange}
    />
  );
};

export default VolumeSlider;

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    maxWidth: width * 0.4,
    marginRight: -12,
  },
});
