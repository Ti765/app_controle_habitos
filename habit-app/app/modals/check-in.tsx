import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '../../store/useThemeStore';
import { useEnergyStore } from '../../store/useEnergyStore';
import { Button } from '../../components/ui/Button';
import { SYMPTOMS } from '../../lib/types/energy';
import { Spacing, Typography, FontWeight, Radius } from '../../constants/Tokens';
import { Ionicons } from '@expo/vector-icons';

export default function CheckInModal() {
  const router = useRouter();
  const { activeColors, theme } = useThemeStore();
  const { addCheckIn } = useEnergyStore();
  const [energyLevel, setEnergyLevel] = useState(5);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const translateY = useSharedValue(500);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const handleSave = async () => {
    await addCheckIn({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      energyLevel,
      symptoms: selectedSymptoms,
      timestamp: new Date().toISOString(),
    });
    handleClose();
  };

  const handleClose = () => {
    translateY.value = withSpring(500, { damping: 15 });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(router.back)();
    });
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: activeColors.overlay }, animatedOverlayStyle]}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={handleClose}
      />
      
      <Animated.View
        style={[
          {
            backgroundColor: activeColors.bgElevated,
            borderTopLeftRadius: Radius.lg,
            borderTopRightRadius: Radius.lg,
            padding: Spacing.xl,
            maxHeight: '80%',
          },
          animatedModalStyle,
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl }}>
          <Text style={{ fontSize: Typography.xl, fontWeight: FontWeight.bold, color: activeColors.text }}>
            Como está sua energia?
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={28} color={activeColors.textDim} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginBottom: Spacing.md }}>
            Nível de Energia
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setEnergyLevel(level)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: energyLevel === level ? activeColors.accent : activeColors.bgBlur,
                  borderWidth: 2,
                  borderColor: energyLevel === level ? activeColors.accent : activeColors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: Typography.base,
                    fontWeight: FontWeight.bold,
                    color: energyLevel === level ? '#ffffff' : activeColors.text,
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginBottom: Spacing.md }}>
            Sintomas (opcional)
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl }}>
            {SYMPTOMS.map((symptom) => (
              <TouchableOpacity
                key={symptom}
                onPress={() => toggleSymptom(symptom)}
                style={{
                  paddingHorizontal: Spacing.lg,
                  paddingVertical: Spacing.md,
                  borderRadius: Radius.full,
                  backgroundColor: selectedSymptoms.includes(symptom)
                    ? activeColors.accentSubtle
                    : activeColors.bgBlur,
                  borderWidth: 1,
                  borderColor: selectedSymptoms.includes(symptom)
                    ? activeColors.accent
                    : activeColors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: Typography.sm,
                    fontWeight: FontWeight.medium,
                    color: selectedSymptoms.includes(symptom)
                      ? activeColors.accent
                      : activeColors.text,
                  }}
                >
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <Button variant="ghost" onPress={handleClose} fullWidth>
              Cancelar
            </Button>
            <Button variant="primary" onPress={handleSave} fullWidth>
              Salvar
            </Button>
          </View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}
