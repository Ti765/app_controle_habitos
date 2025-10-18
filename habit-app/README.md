# Habit Control App

App de controle de hábitos com design Liquid Glass, focado em performance mental e nootrópicos. Construído com React Native (Expo) e TypeScript.

## 🚀 Funcionalidades

### Telas Principais
- **Home**: Energy Ring animado, 4 pilares (Sono/Nutrição/Hidratação/Movimento), preview de hábitos
- **Hábitos**: Lista completa de hábitos organizados por período (Manhã/Tarde/Noite), checkboxes animados, streaks
- **Insights**: Análise de performance, padrões identificados, gráficos de energia por período
- **Perfil**: Avatar com gradiente, estatísticas, nível de progressão, conquistas, configurações (tema, notificações)

### Recursos
- ✅ Modal de Check-in com escala 1-10 e sintomas multi-select
- ✅ Modal de adicionar hábito com seleção de emoji, pilar e período
- ✅ Sistema de tema Dark/Light/Auto com persistência
- ✅ Animações com Reanimated v3 (checkbox pop, card press, ring stroke, modals)
- ✅ Liquid Glass Design (BlurView no iOS, fallback no Android)
- ✅ Cálculo de energia baseado em 5 pilares
- ✅ Sistema de streaks e badges
- ✅ AsyncStorage para persistência local

## 🎨 Design System

### Cores
**Dark (padrão)**
- Background: `#0e1114`
- Elevated: `#1a1d24`
- Accent: `#18b7c7`
- Text: `#e7ebf3`

**Light**
- Background: `#ffffff`
- Elevated: `#f5f5f7`
- Accent: `#0071e3`
- Text: `#1d1d1f`

### Tokens
- Spacing: 4-48px (4pt grid)
- Border Radius: 10px (crítico para Liquid Glass)
- Typography: 11-36px
- Shadows: Sutil estilo macOS

## 📦 Stack Técnica

- **Framework**: React Native (Expo SDK 54+)
- **Linguagem**: TypeScript
- **UI**: NativeWind, Reanimated v3, React Native SVG, Expo Blur
- **Navegação**: Expo Router (file-based)
- **Estado**: Zustand
- **Storage**: AsyncStorage
- **Ícones**: @expo/vector-icons

## 🏗️ Estrutura do Projeto

```
habit-app/
├── app/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── habits.tsx
│   │   ├── insights.tsx
│   │   └── profile.tsx
│   ├── modals/
│   │   ├── check-in.tsx
│   │   └── add-habit.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── ui/ (Button, Card, Input, ProgressBar, Checkbox, Badge)
│   ├── home/ (EnergyRing, PillarCard)
│   ├── habits/ (HabitItem)
│   └── shared/ (Header)
├── lib/
│   ├── storage/ (habits, energy, user storage)
│   ├── calculations/ (energy-score, insights-engine)
│   └── types/ (habit, energy, user)
├── store/ (useHabitsStore, useEnergyStore, useThemeStore, useUserStore)
├── constants/ (Colors, Tokens, Config)
└── utils/ (date-helpers)
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar no modo web
npx expo start --web --port 5000

# Ou usar o workflow configurado no Replit
```

## 🎯 Próximos Passos

- [ ] Integrar backend REST/GraphQL
- [ ] Adicionar integração Apple Health / Google Fit
- [ ] Implementar notificações push
- [ ] Criar tela de onboarding
- [ ] Adicionar exportação de dados (CSV/PDF)
- [ ] Features sociais (desafios, comunidade)

## 📱 Testando

O app pode ser testado na web ou em dispositivos móveis via Expo Go escaneando o QR code gerado.

## 🎨 Referências de Design

- Apple Health
- Streaks
- Things 3
- macOS Big Sur (Liquid Glass)

---

Desenvolvido com foco em performance mental e alta produtividade 🧠⚡
