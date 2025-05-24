import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { userProfile } from '@/utils/mockData';
import { Settings, User, Shield, Heart, Bell, LogOut, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={colors.neutral[600]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[colors.primary[400], colors.primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
                style={styles.profileImage}
              />
            </View>
            
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileMeta}>{userProfile.age} • {userProfile.gender}</Text>
            
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{userProfile.weight}</Text>
                <Text style={styles.profileStatLabel}>kg</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{userProfile.height}</Text>
                <Text style={styles.profileStatLabel}>cm</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>
                  {Math.round((userProfile.weight / ((userProfile.height / 100) * (userProfile.height / 100))) * 10) / 10}
                </Text>
                <Text style={styles.profileStatLabel}>BMI</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Health Goals</Text>
          
          <View style={styles.goalItems}>
            <View style={styles.goalItem}>
              <View style={styles.goalIconContainer}>
                <Heart size={18} color={colors.primary[500]} />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>Daily Steps</Text>
                <Text style={styles.goalValue}>{userProfile.goalSteps.toLocaleString()}</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgress, { width: '78%' }]} />
                </View>
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <View style={styles.goalIconContainer}>
                <Heart size={18} color={colors.primary[500]} />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>Sleep Duration</Text>
                <Text style={styles.goalValue}>{userProfile.goalSleep} hours</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgress, { width: '90%' }]} />
                </View>
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <View style={styles.goalIconContainer}>
                <Heart size={18} color={colors.primary[500]} />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>Weight Goal</Text>
                <Text style={styles.goalValue}>{userProfile.goalWeight} kg</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgress, { width: '60%' }]} />
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.updateGoalsButton}>
            <Text style={styles.updateGoalsButtonText}>Update Goals</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <User size={20} color={colors.primary[500]} />
              </View>
              <Text style={styles.menuItemText}>Account Settings</Text>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Shield size={20} color={colors.secondary[500]} />
              </View>
              <Text style={styles.menuItemText}>Privacy & Security</Text>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Bell size={20} color={colors.warning[500]} />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.error[100] }]}>
                <LogOut size={20} color={colors.error[500]} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.error[500] }]}>Log Out</Text>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.aboutContainer}>
          <Text style={styles.versionText}>Healy v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Healy Health, Inc.</Text>
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
  settingsButton: {
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
  profileCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  profileGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs / 2,
  },
  profileMeta: {
    fontSize: typography.fontSizes.md,
    color: colors.white + 'cc',
    marginBottom: spacing.md,
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    width: '100%',
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
  },
  profileStatLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.white + 'cc',
  },
  profileStatDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.white + '40',
  },
  editProfileButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  editProfileButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary[500],
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  goalsContainer: {
    marginBottom: spacing.xl,
  },
  goalItems: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
    marginBottom: spacing.md,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    marginBottom: spacing.xs / 2,
  },
  goalValue: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  goalProgressBar: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalProgress: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: 3,
  },
  updateGoalsButton: {
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  updateGoalsButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary[500],
  },
  menuContainer: {
    marginBottom: spacing.xl,
  },
  menuItems: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: colors.neutral[900],
  },
  aboutContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  versionText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing.xs,
  },
  copyrightText: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[400],
  },
});