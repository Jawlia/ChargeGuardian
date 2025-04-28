import React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Circle} from 'react-native-svg';
import {View, Text, StyleSheet} from 'react-native';

const BatteryLottieGauge = ({percentage = 81}) => {
  const {colors} = useTheme();
  const size = 150;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.shadowCircle}>
        <Svg width={size} height={size}>
          {/* Inner background fill */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            fill={colors.primary}
          />
        </Svg>
      </View>
      <Svg width={size} height={size}>
        {/* True background fill (inner solid circle) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2} // Full radius
          fill="#262C39"
        />

        {/* Background stroke circle */}
        <Circle
          stroke="rgba(220, 220, 220, 0.8)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Foreground progress circle */}
        <Circle
          stroke={colors.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Text inside the circle */}
      <View style={styles.textContainer}>
        <Text style={styles.percentageText}>
          {percentage}
          <Text style={styles.percentageSymbolText}>%</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowCircle: {
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  percentageSymbolText: {
    color: '#95A1EC',
    fontSize: 16,
  },
});

export default BatteryLottieGauge;
