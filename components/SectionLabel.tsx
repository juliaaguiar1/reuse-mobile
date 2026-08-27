import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../styles/theme';

export default function SectionLabel({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surfaceSoft, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  text: { color: colors.primarySoft, fontSize: 12, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase' }
});
