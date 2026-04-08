import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, darkMode, setDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Configurações</Text>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Aparência</Text>
        <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Modo Escuro</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#FF6347' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferências</Text>
        <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Notificações</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#FF6347' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Localização</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: '#767577', true: '#FF6347' }}
            thumbColor={location ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sobre</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.subtext }]}>Versão</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text }]}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.subtext }]}>Desenvolvido por</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text }]}>Hitalo</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', padding: 16, paddingTop: 20 },
  section: { marginBottom: 16, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1,
  },
  label: { fontSize: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoLabel: { fontSize: 16 },
  infoValue: { fontSize: 16, fontWeight: '600' },
});