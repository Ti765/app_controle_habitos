import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { Config } from '../../constants/Config';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  size?: number;
}

export function Checkbox({
  checked,
  onToggle,
  size = Config.checkboxSize,
}: CheckboxProps) {
  const { activeColors } = useThemeStore();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.15, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    rotate.value = withSpring(checked ? 0 : 360, { damping: 12 });
    onToggle();
  };

  return (
    <AnimatedPressable onPress={handlePress} style={animatedStyle}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 4,
          borderWidth: 2,
          borderColor: checked ? activeColors.accent : activeColors.border,
          backgroundColor: checked ? activeColors.accent : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <Ionicons name="checkmark" size={size * 0.6} color="#ffffff" />
        )}
      </View>
    </AnimatedPressable>
  );
}
