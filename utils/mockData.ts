// Mock data for development purposes

// User profile data
export const userProfile = {
  id: "user-001",
  name: "Alex Johnson",
  age: 32,
  gender: "Male",
  weight: 73, // in kg
  height: 178, // in cm
  goalWeight: 70, // in kg
  goalSteps: 10000,
  goalSleep: 8, // in hours
  goalCalories: 2500,
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
};

// Current day's health metrics
export const currentMetrics = {
  heartRate: {
    current: 72,
    min: 58,
    max: 142,
    average: 68,
    restingHeartRate: 62,
    status: "normal", // normal, elevated, low
  },
  steps: {
    current: 7865,
    goal: 10000,
    percentOfGoal: 78.65,
  },
  calories: {
    burned: 1850,
    goal: 2500,
    percentOfGoal: 74,
  },
  sleep: {
    lastNight: 7.2, // in hours
    quality: "good", // poor, fair, good, excellent
    deepSleep: 2.1, // in hours
    remSleep: 1.8, // in hours
    lightSleep: 3.3, // in hours
    awake: 0.5, // in hours
  },
  water: {
    consumed: 1.8, // in liters
    goal: 3, // in liters
    percentOfGoal: 60,
  },
  bloodOxygen: {
    current: 98, // percentage
    min: 95,
    max: 99,
    average: 97,
  },
  bloodPressure: {
    systolic: 122,
    diastolic: 78,
    status: "normal", // low, normal, elevated, high
  },
  stress: {
    level: "moderate", // low, moderate, high
    score: 65, // 0-100
  },
  temperature: {
    current: 36.6, // in Celsius
    min: 36.2,
    max: 36.8,
  },
};

// Weekly health data for charts and trends
export const weeklyHealthData = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  heartRate: [72, 68, 74, 70, 75, 71, 72],
  steps: [9245, 7652, 10123, 8965, 11240, 6587, 7865],
  calories: [2100, 2050, 2450, 2300, 2600, 1900, 1850],
  sleep: [7.1, 7.6, 7.0, 6.8, 7.5, 8.2, 7.2],
  water: [2.5, 2.2, 2.8, 2.6, 2.3, 2.0, 1.8],
  stress: [40, 55, 65, 50, 70, 35, 65],
};

// Monthly health data
export const monthlyHealthData = {
  weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
  avgHeartRate: [71, 69, 72, 70],
  totalSteps: [65432, 68741, 71254, 63897],
  avgCalories: [2200, 2300, 2150, 2250],
  avgSleep: [7.2, 7.4, 7.1, 7.3],
  avgWater: [2.4, 2.6, 2.3, 2.2],
  avgStress: [45, 50, 60, 55],
};

// Health insights and recommendations
export const healthInsights = [
  {
    id: "insight-001",
    type: "heart",
    title: "Heart Rate Variability",
    description: "Your heart rate variability has improved by 15% this week, indicating better recovery and stress management.",
    recommendation: "Continue your meditation practice to maintain this positive trend.",
    severity: "positive", // positive, neutral, warning, alert
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "insight-002",
    type: "sleep",
    title: "Sleep Quality Declining",
    description: "Your deep sleep has decreased by 20% over the past week, which may affect your recovery and cognitive function.",
    recommendation: "Try to maintain a consistent sleep schedule and avoid screens 1 hour before bedtime.",
    severity: "warning",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "insight-003",
    type: "activity",
    title: "Activity Pattern Change",
    description: "You've been less active on weekdays compared to your previous month's average.",
    recommendation: "Consider scheduling short walks during your work breaks to increase daily activity.",
    severity: "neutral",
    timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: "insight-004",
    type: "nutrition",
    title: "Hydration Improvement",
    description: "Your hydration consistency has improved by 25% this week.",
    recommendation: "Keep using timed water reminders to maintain this positive habit.",
    severity: "positive",
    timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: "insight-005",
    type: "stress",
    title: "Elevated Stress Levels",
    description: "Your stress levels have been consistently higher than normal for the past 3 days.",
    recommendation: "Try the guided breathing exercises in the app for 5 minutes, 3 times daily.",
    severity: "warning",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

// Activity suggestions based on user data
export const activitySuggestions = [
  {
    id: "activity-001",
    title: "Morning Stretch Routine",
    description: "A 10-minute stretch routine to improve flexibility and prepare your body for the day.",
    duration: 10, // in minutes
    caloriesBurn: 45,
    intensity: "low",
    bestTimeOfDay: "morning",
    benefits: ["Improved flexibility", "Reduced muscle tension", "Better posture"],
  },
  {
    id: "activity-002",
    title: "Brisk Walking",
    description: "A 20-minute brisk walk to boost your step count and cardiovascular health.",
    duration: 20, // in minutes
    caloriesBurn: 100,
    intensity: "moderate",
    bestTimeOfDay: "afternoon",
    benefits: ["Improved cardiovascular health", "Increased step count", "Stress reduction"],
  },
  {
    id: "activity-003",
    title: "HIIT Workout",
    description: "A 15-minute high-intensity interval training session to boost metabolism and build strength.",
    duration: 15, // in minutes
    caloriesBurn: 180,
    intensity: "high",
    bestTimeOfDay: "evening",
    benefits: ["Increased metabolism", "Improved strength", "Efficient workout"],
  },
  {
    id: "activity-004",
    title: "Evening Meditation",
    description: "A 10-minute guided meditation to reduce stress and prepare for quality sleep.",
    duration: 10, // in minutes
    caloriesBurn: 10,
    intensity: "low",
    bestTimeOfDay: "evening",
    benefits: ["Stress reduction", "Improved sleep quality", "Mental clarity"],
  },
];

// Health notifications
export const healthNotifications = [
  {
    id: "notification-001",
    type: "alert",
    title: "Elevated Heart Rate",
    message: "Your heart rate reached 142 BPM during rest at 2:30 PM, which is unusual for you.",
    actionRequired: true,
    read: false,
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  {
    id: "notification-002",
    type: "reminder",
    title: "Hydration Reminder",
    message: "You're 40% below your water intake goal for today. Time to hydrate!",
    actionRequired: false,
    read: true,
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "notification-003",
    type: "achievement",
    title: "Step Goal Reached",
    message: "Congratulations! You've reached your step goal for 5 consecutive days.",
    actionRequired: false,
    read: false,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "notification-004",
    type: "insight",
    title: "Sleep Pattern Changed",
    message: "Your sleep efficiency has decreased by 15% this week. Check your sleep insights for recommendations.",
    actionRequired: false,
    read: true,
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

// Health journal entries
export const healthJournal = [
  {
    id: "journal-001",
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    mood: "energetic",
    symptoms: ["none"],
    notes: "Felt great after morning workout. Energy levels stayed high throughout the day.",
    nutrition: {
      quality: "good",
      notes: "Stayed within calorie goals and had balanced meals."
    },
    medications: [],
  },
  {
    id: "journal-002",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    mood: "tired",
    symptoms: ["headache", "fatigue"],
    notes: "Woke up with a mild headache. Felt tired throughout the day despite 8 hours of sleep.",
    nutrition: {
      quality: "fair",
      notes: "Skipped breakfast, had a large lunch."
    },
    medications: ["Ibuprofen"],
  },
];

// Export all mock data
export default {
  userProfile,
  currentMetrics,
  weeklyHealthData,
  monthlyHealthData,
  healthInsights,
  activitySuggestions,
  healthNotifications,
  healthJournal,
};