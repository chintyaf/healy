import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Heart, MoveUp, Zap, Moon } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { useCardPressAnimation, usePulseAnimation } from '@/utils/animations';
import CircularProgress from './CircularProgress';

interface HealthMetricsCardProps {
  heartRate: {
    current: number;
    min: number;
    max: number;
  };
  steps: {
    current: number;
    goal: number;
    percentOfGoal: number;
  };
  calories: {
    burned: number;
    goal: number;
    percentOfGoal: number;
  };
  sleep: {
    lastNight: number;
    quality: string;
  };
  onPress?: () => void;
}

export default function HealthMetricsCard({
  heartRate,
  steps,
  calories,
  sleep,
  onPress,
}: HealthMetricsCardProps) {
  // Use animation for card press effect
  const { animatedStyle, onPressIn, onPressOut } = useCardPressAnimation();
  
  // Use pulsing animation for heart rate
  const pulseStyle = usePulseAnimation(1, 0.05);
  
  // Calculate progress values
  const stepsProgress = Math.min(steps.percentOfGoal / 100, 1);
  const caloriesProgress = Math.min(calories.percentOfGoal / 100, 1);
  const sleepProgress = Math.min(sleep.lastNight / 8, 1); // Assuming 8 hours is the goal
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Today's Metrics</Text>
          <Text style={styles.subtitle}>Your daily health summary</Text>
        </View>
        
        <View style={styles.metricsContainer}>
          {/* Heart Rate */}
          <View style={styles.metricItem}>
            <Animated.View style={[styles.iconContainer, styles.heartIconContainer, pulseStyle]}>
              <Heart size={20} color={colors.white} />
            </Animated.View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>Heart Rate</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>{heartRate.current}</Text>
                <Text style={styles.metricUnit}>BPM</Text>
              </View>
              <Text style={styles.metricRange}>
                {heartRate.min} - {heartRate.max} today
              </Text>
            </View>
          </View>
          
          {/* Steps */}
          <View style={styles.metricItem}>
            <View style={[styles.iconContainer, styles.stepsIconContainer]}>
              <MoveUp size={20} color={colors.white} />
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>Steps</Text>
              <View style={styles.metricProgressContainer}>
                <CircularProgress
                  size={44}
                  strokeWidth={4}
                  progress={stepsProgress}
                  color={colors.secondary[500]}
                  backgroundColor={colors.neutral[200]}
                  value={steps.current.toLocaleString()}
                  containerStyle={styles.progressContainer}
                  valueStyle={styles.progressValue}
                />
                <View>
                  <Text style={styles.metricValue}>{Math.round(steps.percentOfGoal)}%</Text>
                  <Text style={styles.metricTarget}>of daily goal</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Calories */}
          <View style={styles.metricItem}>
            <View style={[styles.iconContainer, styles.caloriesIconContainer]}>
              <Zap size={20} color={colors.white} />
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>Calories</Text>
              <View style={styles.metricProgressContainer}>
                <CircularProgress
                  size={44}
                  strokeWidth={4}
                  progress={caloriesProgress}
                  color={colors.warning[500]}
                  backgroundColor={colors.neutral[200]}
                  value={calories.burned.toLocaleString()}
                  containerStyle={styles.progressContainer}
                  valueStyle={styles.progressValue}
                />
                <View>
                  <Text style={styles.metricValue}>{Math.round(calories.percentOfGoal)}%</Text>
                  <Text style={styles.metricTarget}>of daily goal</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Sleep */}
          <View style={styles.metricItem}>
            <View style={[styles.iconContainer, styles.sleepIconContainer]}>
              <Moon size={20} color={colors.white} />
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>Sleep</Text>
              <View style={styles.metricProgressContainer}>
                <CircularProgress
                  size={44}
                  strokeWidth={4}
                  progress={sleepProgress}
                  color={colors.accent[500]}
                  backgroundColor={colors.neutral[200]}
                  value={sleep.lastNight}
                  valueUnit="h"
                  containerStyle={styles.progressContainer}
                  valueStyle={styles.progressValue}
                  unitStyle={styles.progressUnit}
                />
                <View>
                  <Text style={styles.metricValue}>{sleep.quality}</Text>
                  <Text style={styles.metricTarget}>quality</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
    marginBottom: spacing.md,
  },
  headerContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs / 2,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
  },
  metricsContainer: {
    gap: spacing.md,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  heartIconContainer: {
    backgroundColor: colors.error[500],
  },
  stepsIconContainer: {
    backgroundColor: colors.secondary[500],
  },
  caloriesIconContainer: {
    backgroundColor: colors.warning[500],
  },
  sleepIconContainer: {
    backgroundColor: colors.accent[500],
  },
  metricTextContainer: {
    flex: 1,
  },
  metricLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing.xs / 2,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  metricUnit: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginLeft: spacing.xs / 2,
  },
  metricRange: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[400],
    marginTop: spacing.xs / 2,
  },
  metricProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    marginRight: spacing.md,
  },
  progressValue: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
  },
  progressUnit: {
    fontSize: typography.fontSizes.xs,
    marginBottom: 1,
  },
  metricTarget: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[400],
  },
});