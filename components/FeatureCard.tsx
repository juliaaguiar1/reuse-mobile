import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../styles/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function FeatureCard({ icon, title, description, onPress }: { icon: IconName; title: string; description: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconBox}><Ionicons name={icon} size={22} color={colors.primary} /></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.linkRow}>
        <Text style={styles.link}>Saiba mais</Text>
        <Ionicons name="arrow-forward" size={14} color={colors.primarySoft} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 150, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, gap: 8 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  iconBox: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  title: { color: colors.text, fontSize: 15, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 12.5, lineHeight: 18 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  link: { color: colors.primarySoft, fontSize: 11.5, fontWeight: '800' }
});
