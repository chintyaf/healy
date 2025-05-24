import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import { currentMetrics, weeklyHealthData, monthlyHealthData } from '@/utils/mockData';
import { Heart, Clock, Activity, Droplet, Zap, Moon, ChartBar as BarChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import MetricCard from '@/components/MetricCard';
import CircularProgress from '@/components/CircularProgress';
import DataVisualization from '@/components/DataVisualization';

type TimeFrame = 'daily' | 'weekly' | 'monthly';
type MetricType = 'heartRate' | 'steps' | 'calories' | 'sleep' | 'water' | 'stress';

export default function MetricsScreen() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('heartRate');
  
  const renderTimeFrameSelector = () => (
    <View style={styles.timeFrameContainer}>
      <TouchableOpacity
        style={[styles.timeFrameButton, timeFrame === 'daily' && styles.activeTimeFrame]}
        onPress={() => setTimeFrame('daily')}
      >
        <Text
          style={[
            styles.timeFrameText,
            timeFrame === 'daily' && styles.activeTimeFrameText,
          ]}
        >
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.timeFrameButton, timeFrame === 'weekly' && styles.activeTimeFrame]}
        onPress={() => setTimeFrame('weekly')}
      >
        <Text
          style={[
            styles.timeFrameText,
            timeFrame === 'weekly' && styles.activeTimeFrameText,
          ]}
        >
          Weekly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.timeFrameButton, timeFrame === 'monthly' && styles.activeTimeFrame]}
        onPress={() => setTimeFrame('monthly')}
      >
        <Text
          style={[
            styles.timeFrameText,
            timeFrame === 'monthly' && styles.activeTimeFrameText,
          ]}
        >
          Monthly
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Metrics</Text>
        <Text style={styles.subtitle}>Track your body's vital signs</Text>
      </View>
      
      {renderTimeFrameSelector()}
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.highlightMetricsContainer}>
          <MetricCard
            title="Heart Rate"
            value={currentMetrics.heartRate.current}
            unit="BPM"
            icon={<Heart size={18} color={colors.white} />}
            color={colors.error[500]}
            secondaryColor={colors.error[600]}
            subtitle="Current"
            onPress={() => setSelectedMetric('heartRate')}
          />
          
          <View style={styles.metricsRow}>
            <MetricCard
              title="Sleep"
              value={currentMetrics.sleep.lastNight}
              unit="hrs"
              icon={<Moon size={18} color={colors.white} />}
              color={colors.accent[500]}
              secondaryColor={colors.accent[600]}
              compact
              style={styles.smallMetricCard}
              onPress={() => setSelectedMetric('sleep')}
            />
            <MetricCard
              title="Blood O₂"
              value={currentMetrics.bloodOxygen.current}
              unit="%"
              icon={<Activity size={18} color={colors.white} />}
              color={colors.primary[500]}
              secondaryColor={colors.primary[600]}
              compact
              style={styles.smallMetricCard}
              onPress={() => {}}
            />
          </View>
          
          <View style={styles.metricsRow}>
            <MetricCard
              title="Steps"
              value={currentMetrics.steps.current.toLocaleString()}
              subtitle={`${currentMetrics.steps.percentOfGoal}% of goal`}
              icon={<Activity size={18} color={colors.white} />}
              color={colors.secondary[500]}
              secondaryColor={colors.secondary[600]}
              style={[styles.mediumMetricCard, { marginRight: spacing.md }]}
              onPress={() => setSelectedMetric('steps')}
            />
            <MetricCard
              title="Calories"
              value={currentMetrics.calories.burned.toLocaleString()}
              subtitle={`${currentMetrics.calories.percentOfGoal}% of goal`}
              icon={<Zap size={18} color={colors.white} />}
              color={colors.warning[500]}
              secondaryColor={colors.warning[600]}
              style={styles.mediumMetricCard}
              onPress={() => setSelectedMetric('calories')}
            />
          </View>
          
          <View style={styles.metricsRow}>
            <MetricCard
              title="Water"
              value={currentMetrics.water.consumed}
              unit="L"
              icon={<Droplet size={18} color={colors.white} />}
              color={colors.primary[400]}
              secondaryColor={colors.primary[500]}
              compact
              style={styles.smallMetricCard}
              onPress={() => setSelectedMetric('water')}
            >
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${currentMetrics.water.percentOfGoal}%` }
                  ]} 
                />
              </View>
            </MetricCard>
            <MetricCard
              title="Stress"
              value={currentMetrics.stress.score}
              subtitle={currentMetrics.stress.level}
              icon={<Activity size={18} color={colors.white} />}
              color={colors.error[400]}
              secondaryColor={colors.error[500]}
              compact
              style={styles.smallMetricCard}
              onPress={() => setSelectedMetric('stress')}
            />
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <DataVisualization
          data={timeFrame === 'weekly' ? weeklyHealthData : weeklyHealthData}
          selectedMetric={selectedMetric}
          title={`${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Trends`}
          subtitle={`Your ${selectedMetric} data over time`}
        />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>More Information</Text>
          
          <View style={styles.detailsCard}>
            <LinearGradient
              colors={[colors.primary[50], colors.white]}
              style={styles.detailsGradient}
            >
              <View style={styles.detailsHeader}>
                <View style={styles.detailsIconContainer}>
                  <BarChart size={20} color={colors.primary[500]} />
                </View>
                <Text style={styles.detailsCardTitle}>Health Insights</Text>
              </View>
              
              <Text style={styles.detailsText}>
                Your {selectedMetric === 'heartRate' ? 'heart rate' : selectedMetric} patterns show
                {selectedMetric === 'heartRate' && ' a consistent rhythm with occasional spikes during activity'}
                {selectedMetric === 'steps' && ' you\'re more active in the mornings and evenings'}
                {selectedMetric === 'calories' && ' a healthy metabolic rate throughout the week'}
                {selectedMetric === 'sleep' && ' you\'re getting quality deep sleep but could improve REM cycles'}
                {selectedMetric === 'water' && ' consistent hydration during weekdays but drops on weekends'}
                {selectedMetric === 'stress' && ' moderate levels with peaks during work hours'}
              </Text>
              
              <Text style={styles.detailsRecommendation}>
                {selectedMetric === 'heartRate' && 'Try adding more zone 2 cardio to improve recovery.'}
                {selectedMetric === 'steps' && 'Consider a midday walk to distribute activity more evenly.'}
                {selectedMetric === 'calories' && 'Your calorie burn is consistent with your activity level.'}
                {selectedMetric === 'sleep' && 'Maintain consistent sleep and wake times to improve quality.'}
                {selectedMetric === 'water' && 'Set weekend reminders to maintain hydration consistency.'}
                {selectedMetric === 'stress' && 'Schedule short breaks during peak stress periods.'}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  timeFrameContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
    paddingBottom: spacing.md,
  },
  timeFrameButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    backgroundColor: colors.neutral[100],
  },
  activeTimeFrame: {
    backgroundColor: colors.primary[500],
  },
  timeFrameText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.neutral[700],
  },
  activeTimeFrameText: {
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  highlightMetricsContainer: {
    marginBottom: spacing.lg,
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  smallMetricCard: {
    flex: 1,
    marginRight: spacing.md,
  },
  mediumMetricCard: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: 2,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.lg,
  },
  detailsContainer: {
    marginTop: spacing.lg,
  },
  detailsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  detailsCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  detailsGradient: {
    padding: spacing.md,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  detailsCardTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  detailsText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: typography.lineHeights.body * typography.fontSizes.sm,
    marginBottom: spacing.md,
  },
  detailsRecommendation: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary[700],
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
});