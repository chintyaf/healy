import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/utils/theme';
import { currentMetrics, healthInsights, activitySuggestions, weeklyHealthData } from '@/utils/mockData';
import { Activity, Heart, Moon, Droplet, ArrowRight, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import HealthMetricsCard from '@/components/HealthMetricsCard';
import InsightCard from '@/components/InsightCard';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back 👋</Text>
            <Text style={styles.name}>Alex Johnson</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsContainer}>
          <View style={styles.quickStatsRow}>
            <TouchableOpacity 
              style={[styles.quickStatCard, styles.quickStatLarge]}
              onPress={() => router.push('/metrics')}
            >
              <LinearGradient
                colors={[colors.primary[400], colors.primary[600]]}
                style={styles.quickStatGradient}
              >
                <Heart size={24} color={colors.white} />
                <Text style={styles.quickStatValue}>{currentMetrics.heartRate.current}</Text>
                <Text style={styles.quickStatLabel}>BPM</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickStatCard, styles.quickStatLarge]}
              onPress={() => router.push('/metrics')}
            >
              <LinearGradient
                colors={[colors.secondary[400], colors.secondary[600]]}
                style={styles.quickStatGradient}
              >
                <Activity size={24} color={colors.white} />
                <Text style={styles.quickStatValue}>{currentMetrics.bloodOxygen.current}</Text>
                <Text style={styles.quickStatLabel}>Blood O₂ %</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.quickStatsRow}>
            <TouchableOpacity 
              style={[styles.quickStatCard, styles.quickStatMedium]}
              onPress={() => router.push('/metrics')}
            >
              <LinearGradient
                colors={[colors.accent[400], colors.accent[600]]}
                style={styles.quickStatGradient}
              >
                <Moon size={24} color={colors.white} />
                <Text style={styles.quickStatValue}>{currentMetrics.sleep.lastNight}</Text>
                <Text style={styles.quickStatLabel}>Hours Sleep</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickStatCard, styles.quickStatMedium]}
              onPress={() => router.push('/metrics')}
            >
              <LinearGradient
                colors={[colors.warning[400], colors.warning[600]]}
                style={styles.quickStatGradient}
              >
                <Activity size={24} color={colors.white} />
                <Text style={styles.quickStatValue}>{Math.round(currentMetrics.steps.percentOfGoal)}%</Text>
                <Text style={styles.quickStatLabel}>Steps Goal</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickStatCard, styles.quickStatMedium]}
              onPress={() => router.push('/metrics')}
            >
              <LinearGradient
                colors={[colors.error[400], colors.error[600]]}
                style={styles.quickStatGradient}
              >
                <Droplet size={24} color={colors.white} />
                <Text style={styles.quickStatValue}>{currentMetrics.water.consumed}</Text>
                <Text style={styles.quickStatLabel}>L Water</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Progress</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/metrics')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color={colors.primary[500]} />
            </TouchableOpacity>
          </View>
          <HealthMetricsCard
            heartRate={currentMetrics.heartRate}
            steps={currentMetrics.steps}
            calories={currentMetrics.calories}
            sleep={currentMetrics.sleep}
            onPress={() => router.push('/metrics')}
          />
        </View>

        {/* AI Health Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Health Insights</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/insights')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color={colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {healthInsights.slice(0, 2).map((insight) => (
            <InsightCard
              key={insight.id}
              type={insight.type as any}
              title={insight.title}
              description={insight.description}
              recommendation={insight.recommendation}
              severity={insight.severity as any}
              timestamp={insight.timestamp}
              onPress={() => router.push('/insights')}
            />
          ))}
        </View>

        {/* Weekly Goal Progress */}
        <View style={[styles.section, styles.weeklyProgress]}>
          <LinearGradient
            colors={[colors.primary[500], colors.primary[700]]}
            style={styles.weeklyProgressGradient}
          >
            <View style={styles.weeklyProgressContent}>
              <View style={styles.weeklyProgressHeader}>
                <TrendingUp size={24} color={colors.white} />
                <Text style={styles.weeklyProgressTitle}>Weekly Goal Progress</Text>
              </View>
              <Text style={styles.weeklyProgressText}>
                You're on track to meet your weekly fitness goals! Keep up the great work.
              </Text>
              <TouchableOpacity 
                style={styles.weeklyProgressButton}
                onPress={() => router.push('/activities')}
              >
                <Text style={styles.weeklyProgressButtonText}>View Goals</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[500],
    marginBottom: spacing.xs / 2,
  },
  name: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  quickStatsContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  quickStatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  quickStatCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  quickStatLarge: {
    flex: 1,
  },
  quickStatMedium: {
    flex: 1,
  },
  quickStatGradient: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 120,
  },
  quickStatValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  quickStatLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  seeAllText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary[500],
  },
  weeklyProgress: {
    marginBottom: spacing.xl,
  },
  weeklyProgressGradient: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  weeklyProgressContent: {
    padding: spacing.lg,
  },
  weeklyProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  weeklyProgressTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
  },
  weeklyProgressText: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  weeklyProgressButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  weeklyProgressButtonText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary[500],
  },
});