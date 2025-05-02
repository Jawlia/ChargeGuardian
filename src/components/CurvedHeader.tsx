// src/components/CurvedHeader.tsx
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface CurvedHeaderProps {
  title: string;
  onBack?: () => void;
}

const CurvedHeader: React.FC<CurvedHeaderProps> = ({title, onBack}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Svg
        height={160}
        width="100%"
        viewBox="0 0 1440 320"
        style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#7F00FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#E100FF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          fill="url(#grad)"
          d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,117.3C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </Svg>
      <View style={styles.headerContent}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default CurvedHeader;

const styles = StyleSheet.create({
  container: {
    height: 160,
    justifyContent: 'flex-end',
  },
  headerContent: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
});
