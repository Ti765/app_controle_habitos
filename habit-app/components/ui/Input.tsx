import React from 'react';
import { TextInput, View, Text, TextStyle, ViewStyle } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Radius, Typography, FontWeight } from '../../constants/Tokens';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  const { activeColors } = useThemeStore();

  const labelStyle: TextStyle = {
    color: activeColors.text,
    fontSize: Typography.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  };

  const inputStyle: ViewStyle & TextStyle = {
    backgroundColor: activeColors.bgElevated,
    borderWidth: 1,
    borderColor: error ? activeColors.danger : activeColors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    color: activeColors.text,
    fontSize: Typography.base,
  };

  const errorStyle: TextStyle = {
    color: activeColors.danger,
    fontSize: Typography.xs,
    marginTop: Spacing.xs,
  };

  return (
    <View>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={activeColors.textMuted}
        style={inputStyle}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
}
