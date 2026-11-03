import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ThemedText type="subtitle" style={styles.title}>Tentang MedSearch</ThemedText>
          <ThemedText themeColor="textSecondary">
            MedSearch membantu Anda membaca informasi obat dari label U.S. FDA dengan lebih teratur dan mudah dipahami.
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Sumber: U.S. FDA - OpenFDA Drug Labeling API
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
  title: { color: Colors.light.navy },
});
