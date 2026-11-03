import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MISSING = 'Information not available in the provided drug label.';

type InfoSectionProps = {
  title: string;
  values?: string[];
  collapsible?: boolean;
};

export function InfoSection({ title, values, collapsible = false }: InfoSectionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(!collapsible);
  const text = values?.filter((value) => value.trim()).join('\n\n') || MISSING;
  const isLong = text.length > 700;
  const visibleText = !expanded && isLong ? `${text.slice(0, 700).trim()}...` : text;

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Pressable onPress={() => collapsible && setExpanded((current) => !current)} disabled={!collapsible}>
        <View style={styles.headingRow}>
          <ThemedText style={[styles.heading, { color: theme.navy }]}>{title}</ThemedText>
          {collapsible && isLong && <ThemedText type="small" style={[styles.action, { color: theme.accent }]}>{expanded ? 'Hide' : 'Read more'}</ThemedText>}
        </View>
      </Pressable>
      <ThemedText style={styles.body}>{visibleText}</ThemedText>
      {collapsible && isLong && expanded && (
        <Pressable onPress={() => setExpanded(false)}>
          <ThemedText type="small" style={[styles.action, { color: theme.accent }]}>Show less</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.two },
  heading: { fontSize: 18, fontWeight: '700', color: Colors.light.navy },
  action: { color: Colors.light.accent, fontWeight: '700' },
  body: { lineHeight: 23 },
});
