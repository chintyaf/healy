import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Bell, TriangleAlert as AlertTriangle, Award, HeartPulse, Info } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { useCardPressAnimation } from '@/utils/animations';

interface NotificationAlertProps {
  type: 'alert' | 'reminder' | 'achievement' | 'insight';
  title: string;
  message: string;
  actionRequired?: boolean;
  read?: boolean;
  timestamp: string;
  onPress?: () => void;
}

export default function NotificationAlert({
  type,
  title,
  message,
  actionRequired = false,
  read = false,
  timestamp,
  onPress,
}: NotificationAlertProps) {
  // Use animation for card press effect
  const { animatedStyle, onPressIn, onPressOut } = useCardPressAnimation();
  
  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={20} color={colors.white} />;
      case 'reminder':
        return <Bell size={20} color={colors.white} />;
      case 'achievement':
        return <Award size={20} color={colors.white} />;
      case 'insight':
        return <Info size={20} color={colors.white} />;
      default:
        return <Bell size={20} color={colors.white} />;
    }
  };
  
  // Get color based on notification type
  const getTypeColor = () => {
    switch (type) {
      case 'alert':
        return colors.error[500];
      case 'reminder':
        return colors.primary[500];
      case 'achievement':
        return colors.success[500];
      case 'insight':
        return colors.accent[500];
      default:
        return colors.primary[500];
    }
  };
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMins > 0) {
      return `${diffMins}m ago`;
    } else {
      return 'Just now';
    }
  };
  
  const typeColor = getTypeColor();
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View 
        style={[
          styles.container, 
          animatedStyle,
          read ? styles.readContainer : null
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: typeColor }]}>
          {getIcon()}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
          </View>
          
          <Text style={styles.message} numberOfLines={2}>{message}</Text>
          
          {actionRequired && (
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>Action required</Text>
            </View>
          )}
        </View>
        
        {!read && <View style={styles.unreadIndicator} />}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  readContainer: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    flex: 1,
    marginRight: spacing.sm,
  },
  timestamp: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[500],
  },
  message: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
  },
  actionContainer: {
    backgroundColor: colors.error[100],
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSizes.xs,
    color: colors.error[700],
    fontWeight: typography.fontWeights.medium,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[500],
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
});