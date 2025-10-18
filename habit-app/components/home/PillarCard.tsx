import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useThemeStore } from '../../store/useThemeStore';
import { ProgressBar } from '../ui/ProgressBar';
import { Spacing, Radius, Typography, FontWeight } from '../../constants/Tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PillarCardProps {
  emoji: string;
  title: string;
  value: number;
  color: string;
  onPress?: () => void;
}

export function PillarCard({
  emoji,
  title,
  value,
  color,
  onPress,
}: PillarCardProps) {
  const { activeColors } = useThemeStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: activeColors.bgElevated,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: activeColors.border,
          padding: Spacing.lg,
          flex: 1,
          minWidth: '47%',
        },
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
        <Text style={{ fontSize: Typography.xl, marginRight: Spacing.xs }}>{emoji}</Text>
        <Text
          style={{
            fontSize: Typography.sm,
            fontWeight: FontWeight.medium,
            color: activeColors.text,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: Typography.xxl,
          fontWeight: FontWeight.bold,
          color: activeColors.text,
          marginBottom: Spacing.sm,
        }}
      >
        {value}%
      </Text>
      <ProgressBar value={value} color={color} />
    </AnimatedPressable>
  );
}
