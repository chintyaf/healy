import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { useCardPressAnimation } from '@/utils/animations';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  secondaryColor?: string;
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  subtitle?: string;
  compact?: boolean;
}

export default function MetricCard({
  title,
  value,
  unit,
  icon,
  color = colors.primary[500],
  secondaryColor,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  onPress,
  style,
  children,
  subtitle,
  compact = false,
}: MetricCardProps) {
  // Use animation for card press effect
  const { animatedStyle, onPressIn, onPressOut } = useCardPressAnimation();
  
  // Determine the gradient colors
  const gradientColors = secondaryColor
    ? [color, secondaryColor]
    : [color, color + '88']; // Add transparency to create a subtle gradient
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Animated.View style={[styles.container, animatedStyle, style]}>
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[styles.gradient, compact ? styles.compactGradient : null]}
        >
          <View style={styles.contentContainer}>
            {/* Header with title and icon */}
            <View style={styles.header}>
              <Text style={[styles.title, compact ? styles.compactTitle : null]}>{title}</Text>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
            </View>
            
            {/* Subtitle if provided */}
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
            
            {/* Main value display */}
            <View style={styles.valueContainer}>
              <Text style={[styles.value, compact ? styles.compactValue : null]}>
                {value}
              </Text>
              {unit && <Text style={styles.unit}>{unit}</Text>}
            </View>
            
            {/* Optional children components */}
            {children && <View style={styles.childrenContainer}>{children}</View>}
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  gradient: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    minHeight: 120,
  },
  compactGradient: {
    minHeight: 90,
    padding: spacing.sm,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    fontWeight: typography.fontWeights.medium,
  },
  compactTitle: {
    fontSize: typography.fontSizes.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.white + 'cc', // Add some transparency
    marginTop: -spacing.xs,
    marginBottom: spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white + '33', // Add high transparency
    borderRadius: borderRadius.full,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
  },
  compactValue: {
    fontSize: typography.fontSizes['2xl'],
  },
  unit: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.white + 'cc', // Add some transparency
    marginLeft: spacing.xs,
    marginBottom: spacing.xs,
  },
  childrenContainer: {
    marginTop: spacing.sm,
  },
  pressed: {
    opacity: 0.9,
  },
});