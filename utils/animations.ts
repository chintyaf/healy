import Animated, { 
  withTiming, 
  withSpring, 
  withRepeat, 
  withSequence,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

// Animation presets for consistency across the app

// Smooth fade in animation
export const useFadeInAnimation = (delay = 0, duration = 500) => {
  const opacity = useSharedValue(0);
  
  // Start the animation when the component mounts
  opacity.value = withDelay(
    delay,
    withTiming(1, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  return animatedStyle;
};

// Slide in animation from bottom
export const useSlideInAnimation = (delay = 0, duration = 500) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  
  // Start the animation when the component mounts
  translateY.value = withDelay(
    delay,
    withTiming(0, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  opacity.value = withDelay(
    delay,
    withTiming(1, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });
  
  return animatedStyle;
};

// Scale animation for buttons and cards
export const useScaleAnimation = (delay = 0) => {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0.6);
  
  // Start the animation when the component mounts
  scale.value = withDelay(
    delay,
    withSpring(1, {
      damping: 10,
      stiffness: 100,
    })
  );
  
  opacity.value = withDelay(
    delay,
    withTiming(1, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  return animatedStyle;
};

// Pulsing animation for heart rate indicator
export const usePulseAnimation = (baseScale = 1, pulseStrength = 0.08) => {
  const scale = useSharedValue(baseScale);
  
  // Start the pulsing animation
  scale.value = withRepeat(
    withSequence(
      withTiming(baseScale - pulseStrength, { duration: 500, easing: Easing.out(Easing.sin) }),
      withTiming(baseScale + pulseStrength, { duration: 500, easing: Easing.in(Easing.sin) }),
      withTiming(baseScale, { duration: 500, easing: Easing.inOut(Easing.sin) })
    ),
    -1, // infinite repeat
    true // reverse
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return animatedStyle;
};

// Progress animation for circular progress indicators
export const useProgressAnimation = (targetValue: number, duration = 1500) => {
  const progress = useSharedValue(0);
  
  // Animate to the target value
  progress.value = withTiming(targetValue, {
    duration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  
  return progress;
};

// Animation for card hover/press effect
export const useCardPressAnimation = () => {
  const scale = useSharedValue(1);
  
  const onPressIn = () => {
    scale.value = withTiming(0.98, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  
  const onPressOut = () => {
    scale.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};

// Staggered animation for lists
export const useStaggeredAnimation = (index: number, baseDelay = 50) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  
  // Stagger the animation based on item index
  const delay = baseDelay * index;
  
  opacity.value = withDelay(
    delay,
    withTiming(1, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  translateY.value = withDelay(
    delay,
    withTiming(0, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });
  
  return animatedStyle;
};

// Shimmer loading animation
export const useShimmerAnimation = (width: number) => {
  const translateX = useSharedValue(-width);
  
  translateX.value = withRepeat(
    withTiming(width, {
      duration: 2000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    -1, // infinite repeat
    false // don't reverse
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  
  return animatedStyle;
};

export default {
  useFadeInAnimation,
  useSlideInAnimation,
  useScaleAnimation,
  usePulseAnimation,
  useProgressAnimation,
  useCardPressAnimation,
  useStaggeredAnimation,
  useShimmerAnimation,
};