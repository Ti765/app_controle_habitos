import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { useUserStore } from '../../store/useUserStore';
import { Header } from '../../components/shared/Header';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { userStorage } from '../../lib/storage/user-storage';
import { Spacing, Typography, FontWeight, Radius } from '../../constants/Tokens';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { activeColors, theme, setTheme } = useThemeStore();
  const { user } = useUserStore();

  if (!user) return null;

  const levelProgress = ((user.totalDays % 10) / 10) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.bg }}>
      <Header title="Perfil" />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <Card elevation={2} padding="lg" glass style={{ marginBottom: Spacing.xl, alignItems: 'center' }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              overflow: 'hidden',
              marginBottom: Spacing.lg,
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: activeColors.accent,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 40 }}>👤</Text>
            </View>
          </View>
          
          <Text style={{ fontSize: Typography.xl, fontWeight: FontWeight.bold, color: activeColors.text }}>
            {user.name}
          </Text>
          <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginTop: 4 }}>
            {user.email}
          </Text>
        </Card>

        <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl }}>
          <Card elevation={1} padding="md" style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.accent }}>
              {user.currentStreak}
            </Text>
            <Text style={{ fontSize: Typography.xs, color: activeColors.textDim, marginTop: 4 }}>
              Dias Seguidos
            </Text>
          </Card>
          <Card elevation={1} padding="md" style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.accent }}>
              {user.totalDays}
            </Text>
            <Text style={{ fontSize: Typography.xs, color: activeColors.textDim, marginTop: 4 }}>
              Total de Dias
            </Text>
          </Card>
          <Card elevation={1} padding="md" style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.accent }}>
              {user.level}
            </Text>
            <Text style={{ fontSize: Typography.xs, color: activeColors.textDim, marginTop: 4 }}>
              Nível
            </Text>
          </Card>
        </View>

        <Card elevation={1} padding="md" style={{ marginBottom: Spacing.xl }}>
          <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginBottom: Spacing.sm }}>
            Nível {user.level}
          </Text>
          <ProgressBar value={levelProgress} />
          <Text style={{ fontSize: Typography.xs, color: activeColors.textMuted, marginTop: Spacing.xs }}>
            {user.totalDays % 10} / 10 dias para próximo nível
          </Text>
        </Card>

        <Text style={{ fontSize: Typography.lg, fontWeight: FontWeight.bold, color: activeColors.text, marginBottom: Spacing.md }}>
          Conquistas
        </Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xl }}>
          {user.badges.map((badge) => (
            <Card
              key={badge.id}
              elevation={badge.unlockedAt ? 1 : 0}
              padding="md"
              style={{
                width: '47%',
                opacity: badge.unlockedAt ? 1 : 0.4,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 32, marginBottom: Spacing.sm }}>{badge.icon}</Text>
              <Text style={{ fontSize: Typography.sm, fontWeight: FontWeight.semibold, color: activeColors.text, textAlign: 'center' }}>
                {badge.title}
              </Text>
            </Card>
          ))}
        </View>

        <Text style={{ fontSize: Typography.lg, fontWeight: FontWeight.bold, color: activeColors.text, marginBottom: Spacing.md }}>
          Configurações
        </Text>

        <Card elevation={0} padding="sm" style={{ marginBottom: Spacing.xl }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: Spacing.md,
              paddingHorizontal: Spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications-outline" size={20} color={activeColors.text} />
              <Text style={{ fontSize: Typography.base, color: activeColors.text, marginLeft: Spacing.md }}>
                Notificações
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={activeColors.textDim} />
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: activeColors.separator, marginHorizontal: Spacing.md }} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: Spacing.md,
              paddingHorizontal: Spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="color-palette-outline" size={20} color={activeColors.text} />
              <Text style={{ fontSize: Typography.base, color: activeColors.text, marginLeft: Spacing.md }}>
                Tema
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: Spacing.xs }}>
              {(['dark', 'light', 'auto'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTheme(t)}
                  style={{
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    borderRadius: Radius.md,
                    backgroundColor: theme === t ? activeColors.accentSubtle : 'transparent',
                    borderWidth: 1,
                    borderColor: theme === t ? activeColors.accent : activeColors.border,
                  }}
                >
                  <Text style={{ fontSize: Typography.xs, color: theme === t ? activeColors.accent : activeColors.textDim }}>
                    {t === 'dark' ? '🌙' : t === 'light' ? '☀️' : '⚡'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: activeColors.separator, marginHorizontal: Spacing.md }} />

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: Spacing.md,
              paddingHorizontal: Spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="fitness-outline" size={20} color={activeColors.text} />
              <Text style={{ fontSize: Typography.base, color: activeColors.text, marginLeft: Spacing.md }}>
                Apple Health
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={activeColors.textDim} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}
