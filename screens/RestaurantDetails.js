import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const menuSamples = {
  'Burger House': ['X-Burger R$ 25.90', 'X-Bacon R$ 28.90', 'X-Salada R$ 24.90'],
  'Pizza Express': ['Pizza Margherita R$ 45.00', 'Pizza Pepperoni R$ 48.00'],
  'Sushi Master': ['Combo 20 peças R$ 65.00', 'Hot Roll R$ 35.00'],
  "McDonald's": ['Big Mac R$ 32.00', 'McFritas R$ 12.00', 'McFlurry R$ 15.00'],
  'Burger King': ['Whopper R$ 34.00', 'Onion Rings R$ 14.00'],
  'Subway': ['Sub 30cm R$ 28.00', 'Sub 15cm R$ 18.00'],
  'KFC': ['Balde 6 peças R$ 45.00', 'Combo Box R$ 28.00'],
  "Bob's": ['Big Bob R$ 25.00', 'Milk Shake R$ 18.00'],
  'Açaí da Praia': ['Açaí 500ml R$ 15.00', 'Açaí 700ml R$ 19.00'],
  'Doce Sabor': ['Brownie R$ 12.00', 'Pudim R$ 10.00'],
};

export default function RestaurantDetails({ route, navigation }) {
  const { restaurant } = route.params;
  const menu = menuSamples[restaurant.name] || ['Cardápio em breve'];
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
      </View>

      <View style={[styles.section, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>📍 Endereço</Text>
        <Text style={[styles.text, { color: theme.colors.inputText }]}>
          Av. Rio Branco - Centro, Rio de Janeiro - RJ
        </Text>
      </View>

      <View style={[styles.section, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>⏰ Horário de Funcionamento</Text>
        <Text style={[styles.text, { color: theme.colors.inputText }]}>Segunda a Domingo: 11h às 23h</Text>
      </View>

      <View style={[styles.section, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>🍽️ Destaques do Cardápio</Text>
        {menu.map((item, index) => (
          <Text key={index} style={[styles.menuItem, { color: theme.colors.inputText }]}>• {item}</Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.getParent()?.navigate('HomeTab')}
      >
        <Text style={styles.buttonText}>Ver Cardápio Completo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, backgroundColor: '#FF6347' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  cuisine: { fontSize: 18, color: '#fff' },
  section: { padding: 20, borderBottomWidth: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, lineHeight: 24 },
  menuItem: { fontSize: 16, marginBottom: 8 },
  button: {
    backgroundColor: '#FF6347', padding: 16,
    margin: 20, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});