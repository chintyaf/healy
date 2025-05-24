import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { healthInsights, healthNotifications } from '@/utils/mockData';
import { Brain, ArrowUpRight } from 'lucide-react-native';

// Import components
import InsightCard from '@/components/InsightCard';
import NotificationAlert from '@/components/NotificationAlert';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Insights</Text>
        <Text style={styles.subtitle}>Your personalized health intelligence</Text>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Brain size={24} color={colors.white} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Health Intelligence</Text>
              <Text style={styles.bannerDescription}>
                Healy AI analyzes your data to provide personalized insights and recommendations.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Learn More</Text>
            <ArrowUpRight size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Notifications Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {healthNotifications.slice(0, 3).map((notification) => (
          <NotificationAlert
            key={notification.id}
            type={notification.type as any}
            title={notification.title}
            message={notification.message}
            actionRequired={notification.actionRequired}
            read={notification.read}
            timestamp={notification.timestamp}
          />
        ))}
        
        {/* Insights Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Insights</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {healthInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            type={insight.type as any}
            title={insight.title}
            description={insight.description}
            recommendation={insight.recommendation}
            severity={insight.severity as any}
            timestamp={insight.timestamp}
          />
        ))}
        
        <View style={styles.insightSummary}>
          <Text style={styles.insightSummaryTitle}>Your Weekly Health Summary</Text>
          <Text style={styles.insightSummaryText}>
            Based on your data from this week, your overall health indicators are showing positive trends. Your sleep quality has improved by 15%, and your heart rate variability indicates good recovery. Keep maintaining your evening meditation routine and consistent sleep schedule.
          </Text>
          <View style={styles.insightSummaryStats}>
            <View style={styles.insightSummaryStat}>
              <Text style={styles.insightSummaryStatValue}>+15%</Text>
              <Text style={styles.insightSummaryStatLabel}>Sleep Quality</Text>
            </View>
            <View style={styles.insightSummaryStatDivider} />
            <View style={styles.insightSummaryStat}>
              <Text style={styles.insightSummaryStatValue}>-8%</Text>
              <Text style={styles.insightSummaryStatLabel}>Stress Level</Text>
            </View>
            <View style={styles.insightSummaryStatDivider} />
            <View style={styles.insightSummaryStat}>
              <Text style={styles.insightSummaryStatValue}>+12%</Text>
              <Text style={styles.insightSummaryStatLabel}>Activity</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[500],
    marginTop: spacing.xs / 2,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  banner: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bannerTextContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  bannerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs / 2,
  },
  bannerDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.white + 'ee',
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
  },
  bannerButton: {
    backgroundColor: colors.primary[700],
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  bannerButtonText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
    marginRight: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  seeAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary[500],
    fontWeight: typography.fontWeights.medium,
  },
  insightSummary: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  insightSummaryTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  insightSummaryText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
    marginBottom: spacing.md,
  },
  insightSummaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  insightSummaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  insightSummaryStatValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary[500],
    marginBottom: spacing.xs / 2,
  },
  insightSummaryStatLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[600],
  },
  insightSummaryStatDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
});