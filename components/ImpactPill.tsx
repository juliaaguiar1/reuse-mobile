import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../styles/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function ImpactPill({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
      <Ionicons name={icon} size={16} color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.accentSoft, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 },
  pressed: { opacity: 0.72 },
  label: { color: colors.primary, fontSize: 12, fontWeight: '700' }
});
