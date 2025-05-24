import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Clock, Flame, Dumbbell } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { useCardPressAnimation } from '@/utils/animations';

interface ActivitySuggestionCardProps {
  title: string;
  description: string;
  duration: number; // in minutes
  caloriesBurn: number;
  intensity: 'low' | 'moderate' | 'high';
  bestTimeOfDay: 'morning' | 'afternoon' | 'evening';
  benefits: string[];
  onPress?: () => void;
}

export default function ActivitySuggestionCard({
  title,
  description,
  duration,
  caloriesBurn,
  intensity,
  bestTimeOfDay,
  benefits,
  onPress,
}: ActivitySuggestionCardProps) {
  // Use animation for card press effect
  const { animatedStyle, onPressIn, onPressOut } = useCardPressAnimation();
  
  // Get gradient colors based on intensity
  const getIntensityGradient = () => {
    switch (intensity) {
      case 'low':
        return [colors.secondary[400], colors.secondary[600]];
      case 'moderate':
        return [colors.primary[400], colors.primary[600]];
      case 'high':
        return [colors.accent[400], colors.accent[600]];
      default:
        return [colors.primary[400], colors.primary[600]];
    }
  };
  
  // Get intensity label with proper capitalization
  const getIntensityLabel = () => {
    return intensity.charAt(0).toUpperCase() + intensity.slice(1);
  };
  
  // Get time of day label with proper capitalization
  const getTimeOfDayLabel = () => {
    return bestTimeOfDay.charAt(0).toUpperCase() + bestTimeOfDay.slice(1);
  };
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          colors={getIntensityGradient()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerDetails}>
            <View style={styles.headerDetail}>
              <Clock size={16} color={colors.white} />
              <Text style={styles.headerDetailText}>{duration} min</Text>
            </View>
            <View style={styles.headerDetail}>
              <Flame size={16} color={colors.white} />
              <Text style={styles.headerDetailText}>{caloriesBurn} cal</Text>
            </View>
            <View style={styles.headerDetail}>
              <Dumbbell size={16} color={colors.white} />
              <Text style={styles.headerDetailText}>{getIntensityLabel()}</Text>
            </View>
          </View>
        </LinearGradient>
        
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{description}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Best time:</Text>
            <Text style={styles.infoValue}>{getTimeOfDayLabel()}</Text>
          </View>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsLabel}>Benefits:</Text>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitDot} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
          
          <Pressable style={styles.startButton} onPress={onPress}>
            <Text style={styles.startButtonText}>Start Activity</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
    marginBottom: spacing.md,
  },
  headerGradient: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  headerDetails: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  headerDetailText: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    marginLeft: spacing.xs / 2,
  },
  contentContainer: {
    padding: spacing.md,
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
    marginBottom: spacing.md,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.neutral[700],
    marginRight: spacing.xs,
  },
  infoValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[900],
  },
  benefitsContainer: {
    marginBottom: spacing.md,
  },
  benefitsLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.neutral[700],
    marginBottom: spacing.xs,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
    marginRight: spacing.xs,
  },
  benefitText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
  },
  startButton: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
  },
});