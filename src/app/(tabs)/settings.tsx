import { Appearance, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsScreen() {
  const theme = useTheme();
  const isDark = theme.background === '#0B1720';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ThemedText type="subtitle" style={[styles.title, { color: theme.navy }]}>Pengaturan</ThemedText>
          <View style={[styles.setting, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.settingCopy}>
              <ThemedText style={styles.settingTitle}>Mode gelap</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{isDark ? 'Aktif' : 'Nonaktif'}</ThemedText>
            </View>
            <Switch
              value={isDark}
              onValueChange={(value) => Appearance.setColorScheme(value ? 'dark' : 'light')}
              trackColor={{ false: theme.border, true: theme.accent }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Ubah mode gelap"
            />
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.two },
  title: {},
  setting: { borderWidth: 1, borderRadius: 16, padding: Spacing.three, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingCopy: { gap: Spacing.one },
  settingTitle: { fontWeight: '700' },
});
