import React from 'react';
import { View, Pressable, ViewStyle, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Radius, Shadows } from '../../constants/Tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2;
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  glass?: boolean;
}

export function Card({
  children,
  elevation = 1,
  interactive = false,
  padding = 'md',
  onPress,
  glass = false,
}: CardProps) {
  const { activeColors, theme } = useThemeStore();
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const paddingValues = {
    sm: Spacing.md,
    md: Spacing.lg,
    lg: Spacing.xl,
  };

  const shadowStyles = elevation === 0 ? {} : elevation === 1 ? Shadows.sm : Shadows.md;

  const containerStyle: ViewStyle = {
    borderRadius: Radius.md,
    padding: paddingValues[padding],
    backgroundColor: glass ? activeColors.bgBlur : activeColors.bgElevated,
    borderWidth: 1,
    borderColor: activeColors.border,
    ...shadowStyles,
    overflow: 'hidden',
  };

  const content = <View>{children}</View>;

  if (glass && Platform.OS === 'ios') {
    return (
      <AnimatedPressable
        style={[containerStyle, animatedStyle]}
        onPress={onPress}
        disabled={!interactive && !onPress}
        onPressIn={() => {
          if (interactive || onPress) {
            translateY.value = withSpring(-2);
            scale.value = withSpring(0.98);
          }
        }}
        onPressOut={() => {
          if (interactive || onPress) {
            translateY.value = withSpring(0);
            scale.value = withSpring(1);
          }
        }}
      >
        <BlurView
          intensity={60}
          tint={theme === 'dark' ? 'dark' : 'light'}
          style={{ borderRadius: Radius.md }}
        >
          {content}
        </BlurView>
      </AnimatedPressable>
    );
  }

  if (interactive || onPress) {
    return (
      <AnimatedPressable
        style={[containerStyle, animatedStyle]}
        onPress={onPress}
        disabled={!interactive && !onPress}
        onPressIn={() => {
          translateY.value = withSpring(-2);
          scale.value = withSpring(0.98);
        }}
        onPressOut={() => {
          translateY.value = withSpring(0);
          scale.value = withSpring(1);
        }}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
}
