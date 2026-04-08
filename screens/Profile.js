import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const user = {
  name: 'Hitalo Gomes',
  email: 'hitalo.augusto6@gmail.com',
  phone: '(99) 9 9999-9999',
  address: 'Exemplo, 123 - Centro, Rio de Janeiro',
};

export default function Profile() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{user.name}</Text>
      </View>

      {[
        { label: 'Email', value: user.email },
        { label: 'Telefone', value: user.phone },
        { label: 'Endereço', value: user.address },
      ].map(({ label, value }) => (
        <View key={label} style={[styles.section, {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderBottomColor: theme.colors.border,
        }]}>
          <Text style={[styles.label, { color: theme.colors.subtext }]}>{label}</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 32, alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#FF6347',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold' },
  section: {
    padding: 20, marginTop: 16,
    borderTopWidth: 1, borderBottomWidth: 1,
  },
  label: { fontSize: 14, marginBottom: 4 },
  value: { fontSize: 16 },
});