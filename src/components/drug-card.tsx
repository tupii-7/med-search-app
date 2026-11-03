import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getDrugName } from '@/services/openfda';
import type { DrugLabel } from '@/types/drug';

type DrugCardProps = {
  drug: DrugLabel;
  onPress: () => void;
};

export function DrugCard({ drug, onPress }: DrugCardProps) {
  const theme = useTheme();
  const generic = drug.openfda?.generic_name?.[0] ?? 'Generic name not available';
  const manufacturer = drug.openfda?.manufacturer_name?.[0] ?? 'Manufacturer not available';
  const product = drug.openfda?.product_type?.[0] ?? 'Drug label';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ backgroundColor: theme.card, borderColor: theme.border }, styles.card, pressed && styles.pressed]}>
      <View style={styles.icon}>
        <ThemedText style={styles.iconText}>+</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.brand}>{getDrugName(drug)}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">{generic}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">{manufacturer}</ThemedText>
        <ThemedText type="small" style={[styles.product, { color: theme.accent }]}>{product}</ThemedText>
      </View>
      <ThemedText style={styles.chevron}>›</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  pressed: { opacity: 0.7 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E8F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { color: Colors.light.accent, fontSize: 24, fontWeight: '700', lineHeight: 26 },
  chevron: { color: Colors.light.textSecondary, fontSize: 26, lineHeight: 32 },
  content: { flex: 1, gap: 2 },
  brand: { fontSize: 17, fontWeight: '700' },
  product: { color: Colors.light.accent, marginTop: 4 },
});
