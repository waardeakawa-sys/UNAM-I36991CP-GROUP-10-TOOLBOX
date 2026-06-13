import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const mode: 'light' | 'dark' = scheme === 'dark' ? 'dark' : 'light';
  const colors = Colors[mode];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index" />
      <NativeTabs.Trigger name="explore" />
    </NativeTabs>
  );
}
