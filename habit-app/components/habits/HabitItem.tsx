import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Checkbox } from '../ui/Checkbox';
import { Badge } from '../ui/Badge';
import { useThemeStore } from '../../store/useThemeStore';
import { Spacing, Typography, FontWeight } from '../../constants/Tokens';
import { Ionicons } from '@expo/vector-icons';

interface HabitItemProps {
  emoji: string;
  title: string;
  streak: number;
  completed: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function HabitItem({
  emoji,
  title,
  streak,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: HabitItemProps) {
  const { activeColors } = useThemeStore();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        backgroundColor: activeColors.bgElevated,
        borderRadius: 10,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: activeColors.border,
      }}
    >
      <Checkbox checked={completed} onToggle={onToggle} />
      <View style={{ flex: 1, marginLeft: Spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: Typography.base, marginRight: Spacing.xs }}>
            {emoji}
          </Text>
          <Text
            style={{
              fontSize: Typography.base,
              fontWeight: FontWeight.medium,
              color: activeColors.text,
              textDecorationLine: completed ? 'line-through' : 'none',
              opacity: completed ? 0.6 : 1,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      {streak > 0 && (
        <Badge variant="success" size="sm">
          {streak} 🔥
        </Badge>
      )}
    </View>
  );
}
