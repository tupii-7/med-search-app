import { router } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrugCard } from '@/components/drug-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { getDrugName } from '@/services/openfda';
import { getFavorites, subscribeToFavorites } from '@/services/favorites';

export default function FavoritesScreen() {
  const entries = useSyncExternalStore(subscribeToFavorites, getFavorites, () => []);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}><ThemedText type="subtitle" style={styles.title}>Favorites</ThemedText><ThemedText themeColor="textSecondary">Your saved drug labels</ThemedText></View>
        {entries.length === 0 ? (
          <View style={styles.empty}><ThemedText style={styles.emptyTitle}>No saved labels yet</ThemedText><ThemedText themeColor="textSecondary" style={styles.center}>Tap “Save” on a drug label to keep it here.</ThemedText><Pressable onPress={() => router.push('/search')} style={styles.button}><ThemedText style={styles.buttonText}>Search medicines</ThemedText></Pressable></View>
        ) : (
          <FlatList data={entries} keyExtractor={([id]) => id} contentContainerStyle={styles.list} ItemSeparatorComponent={() => <View style={styles.separator} />} renderItem={({ item: [id, drug] }) => <DrugCard drug={drug} onPress={() => router.push({ pathname: '/drug/[id]', params: { id, q: getDrugName(drug) } })} />} />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { padding: Spacing.four, gap: Spacing.one },
  title: { color: Colors.light.navy },
  list: { padding: Spacing.four, paddingTop: 0 },
  separator: { height: Spacing.two },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.five, gap: Spacing.two },
  emptyTitle: { fontSize: 21, fontWeight: '700', color: Colors.light.navy },
  center: { textAlign: 'center' },
  button: { backgroundColor: Colors.light.accent, borderRadius: 12, paddingHorizontal: Spacing.four, paddingVertical: Spacing.two },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
