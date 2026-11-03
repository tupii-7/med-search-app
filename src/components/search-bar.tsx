import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  autoFocus?: boolean;
};

export function SearchBar({ value, onChangeText, onSubmit, autoFocus }: SearchBarProps) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.searchIcon}><View style={styles.searchGlass} /><View style={styles.searchHandle} /></View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search by brand or generic name"
        placeholderTextColor={Colors.light.textSecondary}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        style={[styles.input, { color: theme.text }]}
      />
      {value.length > 0 && (
        <Pressable accessibilityLabel="Clear search" onPress={() => onChangeText('')} hitSlop={8}>
          <View style={styles.clearIcon}><View style={styles.clearLineOne} /><View style={styles.clearLineTwo} /></View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 54,
  },
  searchIcon: { width: 21, height: 21, justifyContent: 'center' },
  searchGlass: { width: 13, height: 13, borderRadius: 7, borderWidth: 2, borderColor: Colors.light.textSecondary },
  searchHandle: { width: 8, height: 2, backgroundColor: Colors.light.textSecondary, transform: [{ rotate: '45deg' }], position: 'absolute', left: 12, top: 14 },
  clearIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.light.textSecondary },
  clearLineOne: { width: 11, height: 2, backgroundColor: '#FFFFFF', position: 'absolute', left: 4, top: 9, transform: [{ rotate: '45deg' }] },
  clearLineTwo: { width: 11, height: 2, backgroundColor: '#FFFFFF', position: 'absolute', left: 4, top: 9, transform: [{ rotate: '-45deg' }] },
});
