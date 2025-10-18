import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Typography, FontWeight } from '../../constants/Tokens';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

export function Header({ title, subtitle, rightAction }: HeaderProps) {
  const { activeColors } = useThemeStore();

  return (
    <View
      style={{
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: Typography.xxl,
            fontWeight: FontWeight.bold,
            color: activeColors.text,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: Typography.sm,
              color: activeColors.textDim,
              marginTop: 4,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightAction && (
        <TouchableOpacity onPress={rightAction.onPress}>
          <Ionicons
            name={rightAction.icon}
            size={24}
            color={activeColors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
