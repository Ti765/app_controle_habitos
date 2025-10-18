import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { useThemeStore } from '../../store/useThemeStore';
import { Config } from '../../constants/Config';
import { Typography, FontWeight } from '../../constants/Tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface EnergyRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function EnergyRing({
  value,
  size = Config.energyRingSize,
  strokeWidth = Config.energyRingStroke,
}: EnergyRingProps) {
  const { activeColors } = useThemeStore();
  const progress = useSharedValue(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withTiming(value, { duration: 1000 });
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (progress.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColors.separator}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColors.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: Typography.xxxl,
            fontWeight: FontWeight.bold,
            color: activeColors.text,
          }}
        >
          {Math.round(value)}
        </Text>
        <Text
          style={{
            fontSize: Typography.sm,
            color: activeColors.textDim,
            marginTop: 4,
          }}
        >
          Energia
        </Text>
      </View>
    </View>
  );
}
