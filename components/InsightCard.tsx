import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Heart, Moon, Activity, Coffee, Flame } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { useCardPressAnimation } from '@/utils/animations';

interface InsightCardProps {
  type: 'heart' | 'sleep' | 'activity' | 'nutrition' | 'stress';
  title: string;
  description: string;
  recommendation?: string;
  severity: 'positive' | 'neutral' | 'warning' | 'alert';
  timestamp: string;
  onPress?: () => void;
}

export default function InsightCard({
  type,
  title,
  description,
  recommendation,
  severity,
  timestamp,
  onPress,
}: InsightCardProps) {
  // Use animation for card press effect
  const { animatedStyle, onPressIn, onPressOut } = useCardPressAnimation();
  
  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'heart':
        return <Heart size={20} color={colors.white} />;
      case 'sleep':
        return <Moon size={20} color={colors.white} />;
      case 'activity':
        return <Activity size={20} color={colors.white} />;
      case 'nutrition':
        return <Coffee size={20} color={colors.white} />;
      case 'stress':
        return <Flame size={20} color={colors.white} />;
      default:
        return <Activity size={20} color={colors.white} />;
    }
  };
  
  // Get color based on severity
  const getSeverityColor = () => {
    switch (severity) {
      case 'positive':
        return colors.success[500];
      case 'neutral':
        return colors.primary[500];
      case 'warning':
        return colors.warning[500];
      case 'alert':
        return colors.error[500];
      default:
        return colors.primary[500];
    }
  };
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const severityColor = getSeverityColor();
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: severityColor }]}>
            {getIcon()}
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        
        {recommendation && (
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationLabel}>Recommendation:</Text>
            <Text style={styles.recommendation}>{recommendation}</Text>
          </View>
        )}
        
        <View style={[styles.severityIndicator, { backgroundColor: severityColor }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  timestamp: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[500],
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
    marginBottom: spacing.sm,
  },
  recommendationContainer: {
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  recommendationLabel: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    color: colors.neutral[700],
    marginBottom: spacing.xs / 2,
  },
  recommendation: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
  },
  severityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 4,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
  },
});