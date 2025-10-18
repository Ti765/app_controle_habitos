import React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Radius, Typography, FontWeight } from '../../constants/Tokens';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  const { activeColors } = useThemeStore();

  const variants = {
    default: {
      backgroundColor: activeColors.accentSubtle,
      color: activeColors.accent,
    },
    success: {
      backgroundColor: 'rgba(52, 211, 153, 0.15)',
      color: activeColors.success,
    },
    warning: {
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
      color: activeColors.warning,
    },
    danger: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: activeColors.danger,
    },
  };

  const sizes = {
    sm: {
      paddingVertical: 2,
      paddingHorizontal: Spacing.sm,
      fontSize: Typography.xs,
    },
    md: {
      paddingVertical: 4,
      paddingHorizontal: Spacing.md,
      fontSize: Typography.sm,
    },
  };

  const containerStyle: ViewStyle = {
    backgroundColor: variants[variant].backgroundColor,
    borderRadius: Radius.full,
    paddingVertical: sizes[size].paddingVertical,
    paddingHorizontal: sizes[size].paddingHorizontal,
    alignSelf: 'flex-start',
  };

  const textStyle: TextStyle = {
    color: variants[variant].color,
    fontSize: sizes[size].fontSize,
    fontWeight: FontWeight.semibold,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
