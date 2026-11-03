import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

const DISCLAIMER =
  'MedSearch is an informational reference application. The information provided is sourced from U.S. FDA drug labeling and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making medication-related decisions.';

export default function HomeScreen() {
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
          <ThemedText style={styles.brand}>MedSearch</ThemedText>
          <View style={styles.hero}>
            <ThemedText type="subtitle" style={styles.title}>Find medicine information, made easier.</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Search trusted U.S. FDA drug labels in a clear, organized format.
            </ThemedText>
          </View>
          <SearchBar value={query} onChangeText={setQuery} onSubmit={submit} />
          <Pressable onPress={submit} style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
            <ThemedText style={styles.searchButtonText}>Search drug labels</ThemedText>
          </Pressable>
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoTitle}>A reference, not a diagnosis</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Explore label information about uses, dosage, warnings, side effects, and interactions.
            </ThemedText>
          </View>
          <ThemedText style={styles.disclaimer}>{DISCLAIMER}</ThemedText>
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
