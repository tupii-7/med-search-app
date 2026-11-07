import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const submit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    Keyboard.dismiss();
    router.push({ pathname: '/search', params: { q: trimmed } });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ThemedText style={[styles.brand, { color: theme.navy }]}>MedSearch</ThemedText>
          <View style={styles.hero}>
            <ThemedText type="subtitle" style={[styles.title, { color: theme.navy }]}>Cari informasi obat.</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>Data label resmi U.S. FDA.</ThemedText>
          </View>
          <SearchBar value={query} onChangeText={setQuery} onSubmit={submit} />
          <Pressable onPress={submit} style={({ pressed }) => [styles.searchButton, { backgroundColor: theme.accent }, pressed && styles.pressed]}>
            <ThemedText style={styles.searchButtonText}>Cari obat</ThemedText>
          </Pressable>
          <View style={[styles.infoCard, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={[styles.infoTitle, { color: theme.navy }]}>Referensi obat</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Baca kegunaan, dosis, dan peringatan.</ThemedText>
          </View>
          <ThemedText style={styles.disclaimer}>Bukan pengganti saran dokter.</ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three, flexGrow: 1 },
  brand: { fontSize: 22, fontWeight: '800', color: Colors.light.navy, marginBottom: Spacing.four },
  hero: { gap: Spacing.two, marginBottom: Spacing.two },
  title: { fontSize: 34, lineHeight: 40, color: Colors.light.navy },
  subtitle: { fontSize: 17, lineHeight: 25 },
  searchButton: { backgroundColor: Colors.light.accent, minHeight: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  searchButtonText: { color: '#FFFFFF', fontWeight: '700' },
  pressed: { opacity: 0.75 },
  infoCard: { backgroundColor: '#E8F4F7', borderRadius: 16, padding: Spacing.three, gap: Spacing.one, marginTop: Spacing.two },
  infoTitle: { color: Colors.light.navy, fontWeight: '700' },
  disclaimer: { fontSize: 12, lineHeight: 18, color: Colors.light.textSecondary, marginTop: 'auto' },
});
