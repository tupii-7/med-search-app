import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ThemedText type="subtitle" style={[styles.title, { color: theme.navy }]}>Tentang MedSearch</ThemedText>
          <ThemedText themeColor="textSecondary">Informasi obat dari label U.S. FDA.</ThemedText>
          <View style={[styles.creator, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <ThemedText style={styles.creatorTitle}>Pembuat</ThemedText>
            <ThemedText themeColor="textSecondary">Said Fachri Ariza</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">NIM 60320423</ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Sumber: OpenFDA
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: {},
  creator: { borderWidth: 1, borderRadius: 16, padding: Spacing.three, gap: Spacing.one },
  creatorTitle: { fontWeight: '700' },
});
