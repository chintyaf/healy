import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { activitySuggestions } from '@/utils/mockData';
import { Filter, Play, Calendar, Clock, Bookmark } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import ActivitySuggestionCard from '@/components/ActivitySuggestionCard';

export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Activities</Text>
          <Text style={styles.subtitle}>Smart workouts & recommendations</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.neutral[600]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Workout */}
        <View style={styles.featuredContainer}>
          <LinearGradient
            colors={[colors.accent[400], colors.accent[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredContent}>
              <View>
                <Text style={styles.featuredLabel}>Featured Workout</Text>
                <Text style={styles.featuredTitle}>Morning Energizer</Text>
                <Text style={styles.featuredDescription}>
                  A 15-minute routine to boost your energy and jumpstart your day.
                </Text>
                
                <View style={styles.featuredMeta}>
                  <View style={styles.featuredMetaItem}>
                    <Clock size={14} color={colors.white} />
                    <Text style={styles.featuredMetaText}>15 min</Text>
                  </View>
                  <View style={styles.featuredMetaItem}>
                    <Calendar size={14} color={colors.white} />
                    <Text style={styles.featuredMetaText}>Daily</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.featuredButton}>
                  <Play size={16} color={colors.accent[500]} fill={colors.accent[500]} />
                  <Text style={styles.featuredButtonText}>Start Now</Text>
                </TouchableOpacity>
              </View>
              
              <Image
                source={{ uri: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg' }}
                style={styles.featuredImage}
              />
            </View>
          </LinearGradient>
        </View>
        
        {/* Activity Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: colors.primary[100] }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg' }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryTitle}>Cardio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: colors.secondary[100] }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg' }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryTitle}>Strength</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: colors.accent[100] }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg' }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryTitle}>Yoga</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: colors.warning[100] }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg' }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryTitle}>Meditation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: colors.error[100] }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/6455869/pexels-photo-6455869.jpeg' }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryTitle}>HIIT</Text>
          </TouchableOpacity>
        </ScrollView>
        
        {/* Recommended Activities */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {activitySuggestions.map((activity) => (
          <ActivitySuggestionCard
            key={activity.id}
            title={activity.title}
            description={activity.description}
            duration={activity.duration}
            caloriesBurn={activity.caloriesBurn}
            intensity={activity.intensity as any}
            bestTimeOfDay={activity.bestTimeOfDay as any}
            benefits={activity.benefits}
          />
        ))}
        
        {/* Saved Workouts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Workouts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.savedWorkoutsContainer}>
          <View style={styles.savedWorkout}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg' }}
              style={styles.savedWorkoutImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.savedWorkoutGradient}
            >
              <View style={styles.savedWorkoutContent}>
                <Text style={styles.savedWorkoutTitle}>Full Body HIIT</Text>
                <Text style={styles.savedWorkoutMeta}>30 min • High Intensity</Text>
              </View>
              <TouchableOpacity style={styles.savedWorkoutBookmark}>
                <Bookmark size={16} color={colors.white} fill={colors.white} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
          <View style={styles.savedWorkout}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/4389174/pexels-photo-4389174.jpeg' }}
              style={styles.savedWorkoutImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.savedWorkoutGradient}
            >
              <View style={styles.savedWorkoutContent}>
                <Text style={styles.savedWorkoutTitle}>Evening Yoga Flow</Text>
                <Text style={styles.savedWorkoutMeta}>20 min • Low Intensity</Text>
              </View>
              <TouchableOpacity style={styles.savedWorkoutBookmark}>
                <Bookmark size={16} color={colors.white} fill={colors.white} />
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  featuredContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  featuredGradient: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredLabel: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    color: colors.white + 'cc',
    marginBottom: spacing.xs / 2,
  },
  featuredTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  featuredDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.white + 'ee',
    marginBottom: spacing.sm,
    maxWidth: '80%',
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  featuredMetaText: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    marginLeft: spacing.xs / 2,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.accent[500],
    marginLeft: spacing.xs,
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    paddingBottom: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  categoryCard: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary[500],
    fontWeight: typography.fontWeights.medium,
  },
  savedWorkoutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  savedWorkout: {
    width: '48%',
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  savedWorkoutImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  savedWorkoutGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  savedWorkoutContent: {
    flex: 1,
  },
  savedWorkoutTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs / 2,
  },
  savedWorkoutMeta: {
    fontSize: typography.fontSizes.xs,
    color: colors.white + 'cc',
  },
  savedWorkoutBookmark: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});