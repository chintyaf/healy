import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors, typography } from '@/utils/theme';

// Create an animated circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 1
  color?: string;
  backgroundColor?: string;
  label?: string;
  value?: string | number;
  valueUnit?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  unitStyle?: TextStyle;
  children?: React.ReactNode;
}

export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  color = colors.primary[500],
  backgroundColor = colors.neutral[200],
  label,
  value,
  valueUnit,
  containerStyle,
  labelStyle,
  valueStyle,
  unitStyle,
  children,
}: CircularProgressProps) {
  // Calculate radius and center coordinates
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Animation progress value
  const progressValue = useSharedValue(0);
  
  // Update the progress value when the prop changes
  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress]);
  
  // Animated props for the progress circle
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progressValue.value);
    return {
      strokeDashoffset,
    };
  });
  
  return (
    <View style={[styles.container, containerStyle]}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      
      {/* Center Content */}
      <View style={styles.contentContainer}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={styles.valueContainer}>
          {value !== undefined && (
            <Text style={[styles.value, valueStyle]}>{value}</Text>
          )}
          {valueUnit && <Text style={[styles.unit, unitStyle]}>{valueUnit}</Text>}
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[500],
    marginBottom: 2,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  unit: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: 3,
    marginLeft: 2,
  },
});