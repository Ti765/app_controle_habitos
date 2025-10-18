import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useThemeStore } from '../../store/useThemeStore';
import { Radius } from '../../constants/Tokens';

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  height?: number;
  color?: string;
}

export function ProgressBar({
  value,
  maxValue = 100,
  height = 6,
  color,
}: ProgressBarProps) {
  const { activeColors } = useThemeStore();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming((value / maxValue) * 100, { duration: 500 });
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View
      style={{
        width: '100%',
        height,
        backgroundColor: activeColors.separator,
        borderRadius: Radius.full,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            backgroundColor: color || activeColors.accent,
            borderRadius: Radius.full,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
