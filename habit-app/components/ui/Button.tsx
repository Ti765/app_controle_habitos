import React from 'react';
import { Text, Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Radius, Typography, FontWeight } from '../../constants/Tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const { activeColors } = useThemeStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sizes = {
    sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, fontSize: Typography.sm },
    md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, fontSize: Typography.base },
    lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl, fontSize: Typography.md },
  };

  const variants = {
    primary: {
      backgroundColor: activeColors.accent,
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: activeColors.accentSubtle,
      color: activeColors.accent,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: activeColors.text,
    },
    danger: {
      backgroundColor: activeColors.danger,
      color: '#ffffff',
    },
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    paddingVertical: sizes[size].paddingVertical,
    paddingHorizontal: sizes[size].paddingHorizontal,
    backgroundColor: variants[variant].backgroundColor,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const textStyle: TextStyle = {
    color: variants[variant].color,
    fontSize: sizes[size].fontSize,
    fontWeight: FontWeight.semibold,
  };

  return (
    <AnimatedPressable
      style={[containerStyle, animatedStyle]}
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => {
        scale.value = withSpring(0.96);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      {loading ? (
        <ActivityIndicator color={variants[variant].color} />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{children}</Text>
        </>
      )}
    </AnimatedPressable>
  );
}
