import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MISSING = 'Information not available in the provided drug label.';

type InfoSectionProps = {
  title: string;
  values?: string[];
  collapsible?: boolean;
};

type LabelParagraph = {
  text: string;
  bullet: boolean;
};

function formatLabelText(values?: string[]): LabelParagraph[] {
  const paragraphs = (values ?? [])
    .filter((value) => value.trim())
    .flatMap((value) =>
      value
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
        .replace(/<(p|div|li|h[1-6])[^>]*>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .split(/\n+/)
        .flatMap((line) =>
          line
            .replace(/(\b\d+\s+[A-Z][A-Z\s]{5,})(?=\s|$)/g, '\n$1\n')
            .replace(/\s+(?=\(\d+(?:\.\d+)*\):)/g, '\n')
            .split(/\n+/)
            .flatMap((part) =>
              part.split(
                /(?<=[.!?])\s+(?=(?:If|When|Obtain|Administer|Continue|Give|Calculate|Monitor|Stop|For|Patients?|The)\b)/,
              ),
            ),
        ),
    )
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  return paragraphs.map((text) => ({
    text: text.replace(/^(?:[-*•]|\d+[.)]|[A-Z][.)])\s+/, '').trim(),
    bullet: /^(?:[-*•]|\d+[.)]|[A-Z][.)])\s+/.test(text),
  }));
}

export function InfoSection({ title, values, collapsible = false }: InfoSectionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(!collapsible);
  const paragraphs = formatLabelText(values);
  if (paragraphs.length === 0) paragraphs.push({ text: MISSING, bullet: false });
  const textLength = paragraphs.reduce((total, paragraph) => total + paragraph.text.length, 0);
  const isLong = textLength > 700;
  const visibleParagraphs = !expanded && isLong
    ? paragraphs.slice(0, Math.max(1, paragraphs.findIndex((paragraph, index) =>
      paragraphs.slice(0, index + 1).reduce((total, item) => total + item.text.length, 0) > 700,
    )))
    : paragraphs;

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Pressable onPress={() => collapsible && setExpanded((current) => !current)} disabled={!collapsible}>
        <View style={styles.headingRow}>
          <ThemedText style={[styles.heading, { color: theme.navy }]}>{title}</ThemedText>
          {collapsible && isLong && <ThemedText type="small" style={[styles.action, { color: theme.accent }]}>{expanded ? 'Hide' : 'Read more'}</ThemedText>}
        </View>
      </Pressable>
      <View style={styles.body}>
        {visibleParagraphs.map((paragraph, index) => (
          <ThemedText key={`${paragraph.text.slice(0, 12)}-${index}`} style={styles.paragraph}>
            {paragraph.bullet ? '• ' : ''}{paragraph.text}{!expanded && index === visibleParagraphs.length - 1 && isLong ? '...' : ''}
          </ThemedText>
        ))}
      </View>
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
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.two,
    borderWidth: 1,
  },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.two },
  heading: { fontSize: 18, fontWeight: '700' },
  action: { fontWeight: '700' },
  body: { gap: Spacing.two },
  paragraph: { lineHeight: 23 },
});
