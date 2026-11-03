import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrugCard } from '@/components/drug-card';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { getDrugId, searchDrugs } from '@/services/openfda';
import type { DrugLabel } from '@/types/drug';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const initialQuery = typeof params.q === 'string' ? params.q : '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<DrugLabel[]>([]);
  const [loading, setLoading] = useState(Boolean(initialQuery));
  const [error, setError] = useState('');

  const runSearch = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setError('');
    try {
      setResults(await searchDrugs(trimmed));
    } catch (requestError) {
      setResults([]);
      setError(requestError instanceof Error ? requestError.message : 'Unable to search drug labels.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialQuery) return;
    const timer = setTimeout(() => void runSearch(initialQuery), 0);
    return () => clearTimeout(timer);
  }, [initialQuery]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10}><ThemedText style={styles.back}>Back</ThemedText></Pressable>
          <ThemedText style={styles.heading}>Search drug labels</ThemedText>
        </View>
        <View style={styles.search}><SearchBar value={query} onChangeText={setQuery} onSubmit={() => void runSearch(query)} autoFocus={!initialQuery} /></View>
        {loading ? (
          <View style={styles.state}><ActivityIndicator size="large" color={Colors.light.accent} /><ThemedText themeColor="textSecondary">Searching U.S. FDA labels...</ThemedText></View>
        ) : error ? (
          <View style={styles.state}><ThemedText style={styles.stateTitle}>We couldn&apos;t complete that search</ThemedText><ThemedText themeColor="textSecondary" style={styles.center}>{error}</ThemedText><Pressable onPress={() => void runSearch(query)} style={styles.retry}><ThemedText style={styles.retryText}>Try again</ThemedText></Pressable></View>
        ) : results.length === 0 ? (
          <View style={styles.state}><ThemedText style={styles.stateTitle}>{query ? 'No labels found' : 'Search for a medicine'}</ThemedText><ThemedText themeColor="textSecondary" style={styles.center}>{query ? 'Try a brand or generic name with a different spelling.' : 'Enter a medicine name above to get started.'}</ThemedText></View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item, index) => getDrugId(item, index)}
            contentContainerStyle={styles.list}
            ListHeaderComponent={<ThemedText themeColor="textSecondary" style={styles.resultCount}>{results.length} label{results.length === 1 ? '' : 's'} found</ThemedText>}
            renderItem={({ item, index }) => <DrugCard drug={item} onPress={() => router.push({ pathname: '/drug/[id]', params: { id: getDrugId(item, index), q: query, index: String(index) } })} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingHorizontal: Spacing.four, paddingTop: Spacing.two },
  back: { color: Colors.light.accent, fontWeight: '700' },
  heading: { fontSize: 21, fontWeight: '700', color: Colors.light.navy },
  search: { padding: Spacing.four },
  list: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.five },
  resultCount: { marginBottom: Spacing.two },
  separator: { height: Spacing.two },
  state: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.five, gap: Spacing.two },
  stateTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: Colors.light.navy },
  center: { textAlign: 'center' },
  retry: { backgroundColor: Colors.light.accent, paddingHorizontal: Spacing.four, paddingVertical: Spacing.two, borderRadius: 12 },
  retryText: { color: '#FFFFFF', fontWeight: '700' },
});
