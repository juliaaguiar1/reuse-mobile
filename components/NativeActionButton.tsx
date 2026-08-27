import { Button, Platform, StyleSheet, View } from 'react-native';
import { colors, radius } from '../styles/theme';

export default function NativeActionButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View style={styles.wrapper}>
      <Button title={title} onPress={onPress} color={Platform.OS === 'ios' ? colors.white : colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.primary }
});
