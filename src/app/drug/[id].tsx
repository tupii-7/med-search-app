import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InfoSection } from '@/components/info-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { getDrugById, getDrugName, getSourceUrl } from '@/services/openfda';
import { isFavorite, subscribeToFavorites, toggleFavorite } from '@/services/favorites';
import type { DrugLabel } from '@/types/drug';

export default function DrugDetailScreen() {
  const { id, q, index } = useLocalSearchParams<{ id: string; q?: string; index?: string }>();
  const [drug, setDrug] = useState<DrugLabel>();
  const [error, setError] = useState('');
  const favorite = useSyncExternalStore(subscribeToFavorites, () => Boolean(id && isFavorite(id)), () => false);

  useEffect(() => {
    if (!id) return;
    void getDrugById(id, q, Number(index) || 0).then(setDrug).catch((requestError: unknown) => {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load this drug label.');
    });
  }, [id, q, index]);

  if (!drug && !error) {
    return <ThemedView style={styles.center}><ActivityIndicator size="large" color={Colors.light.accent} /></ThemedView>;
  }
  if (error || !drug) {
    return <ThemedView style={styles.center}><ThemedText style={styles.errorTitle}>Drug label unavailable</ThemedText><ThemedText themeColor="textSecondary">{error || 'The selected label could not be found.'}</ThemedText><Pressable onPress={() => router.back()} style={styles.retry}><ThemedText style={styles.retryText}>Go back</ThemedText></Pressable></ThemedView>;
  }

  const brand = drug.openfda?.brand_name?.[0] ?? getDrugName(drug);
  const generic = drug.openfda?.generic_name?.[0] ?? 'Generic name not available';
  const manufacturer = drug.openfda?.manufacturer_name?.[0] ?? 'Manufacturer not available';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.topRow}>
            <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>Back to results</ThemedText></Pressable>
            <Pressable onPress={() => id && toggleFavorite(id, drug)} style={styles.favoriteButton}>
              <ThemedText style={styles.favoriteText}>{favorite ? '★ Saved' : '☆ Save'}</ThemedText>
            </Pressable>
          </View>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.brand}>{brand}</ThemedText>
            <ThemedText style={styles.generic}>{generic}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{manufacturer}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{drug.openfda?.product_type?.[0] ?? 'Drug label'}</ThemedText>
          </View>
          <ThemedText style={styles.sectionIntro}>Drug label information</ThemedText>
          <InfoSection title="What is this medicine?" values={drug.description} collapsible />
          <InfoSection title="Uses and Indications" values={drug.indications_and_usage} collapsible />
          <InfoSection title="Dosage and Administration" values={drug.dosage_and_administration} collapsible />
          <InfoSection title="Side Effects" values={drug.adverse_reactions} collapsible />
          <InfoSection title="Warnings" values={drug.warnings} collapsible />
          <InfoSection title="Contraindications" values={drug.contraindications} collapsible />
          <InfoSection title="Drug Interactions" values={drug.drug_interactions} collapsible />
          <View style={styles.disclaimerBox}><ThemedText type="small" style={styles.disclaimer}>{'MedSearch is an informational reference application. The information provided is sourced from U.S. FDA drug labeling and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making medication-related decisions.'}</ThemedText></View>
          <Pressable onPress={() => void Linking.openURL(getSourceUrl(drug))}><ThemedText style={styles.source}>Source: U.S. FDA - OpenFDA Drug Labeling API</ThemedText></Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: Colors.light.accent, fontWeight: '700' },
  favoriteButton: { backgroundColor: '#FFF2C7', borderRadius: 12, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two },
  favoriteText: { color: '#765500', fontWeight: '700' },
  header: { gap: Spacing.one, paddingVertical: Spacing.two },
  sectionIntro: { fontSize: 20, fontWeight: '700', color: Colors.light.navy, marginTop: Spacing.two },
  brand: { fontSize: 32, lineHeight: 38, color: Colors.light.navy },
  generic: { fontSize: 18, lineHeight: 25 },
  disclaimerBox: { backgroundColor: '#FFF7E6', borderRadius: 14, padding: Spacing.three },
  disclaimer: { color: '#73510B' },
  source: { color: Colors.light.accent, fontWeight: '700', textAlign: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four, gap: Spacing.two },
  errorTitle: { fontSize: 20, fontWeight: '700', color: Colors.light.navy },
  retry: { backgroundColor: Colors.light.accent, paddingHorizontal: Spacing.four, paddingVertical: Spacing.two, borderRadius: 12 },
  retryText: { color: '#FFFFFF', fontWeight: '700' },
});
