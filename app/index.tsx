import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { colors, spacing, typography } from '@/utils/theme';
import { currentMetrics, healthInsights, activitySuggestions, weeklyHealthData } from '@/utils/mockData';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Import components
import HealthMetricsCard from '@/components/HealthMetricsCard';
import DataVisualization from '@/components/DataVisualization';
import ActivitySuggestionCard from '@/components/ActivitySuggestionCard';
import InsightCard from '@/components/InsightCard';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const router = useRouter();
  
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });
  
  // Hide splash screen once fonts are loaded
  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  
  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Alex</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today's Health Metrics */}
        <HealthMetricsCard
          heartRate={currentMetrics.heartRate}
          steps={currentMetrics.steps}
          calories={currentMetrics.calories}
          sleep={currentMetrics.sleep}
          onPress={() => router.push('/metrics')}
        />
        
        {/* Weekly Data Visualization */}
        <DataVisualization
          data={weeklyHealthData}
          selectedMetric="heartRate"
          title="Weekly Health Trends"
          subtitle="Tap a metric to see detailed data"
        />
        
        {/* Health Insights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Insights</Text>
          <Text style={styles.sectionSubtitle}>AI-powered health analysis</Text>
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
        
        {/* Activity Suggestions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested Activities</Text>
          <Text style={styles.sectionSubtitle}>Based on your goals and data</Text>
        </View>
        
        {activitySuggestions.slice(0, 1).map((activity) => (
          <ActivitySuggestionCard
            key={activity.id}
            title={activity.title}
            description={activity.description}
            duration={activity.duration}
            caloriesBurn={activity.caloriesBurn}
            intensity={activity.intensity as any}
            bestTimeOfDay={activity.bestTimeOfDay as any}
            benefits={activity.benefits}
            onPress={() => router.push('/activities')}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
  },
  date: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.white,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
});