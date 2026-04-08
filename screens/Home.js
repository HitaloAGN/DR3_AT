import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const categories = [
  { id: '1', name: 'Lanches', icon: '🍔' },
  { id: '2', name: 'Bebidas', icon: '🥤' },
  { id: '3', name: 'Sobremesas', icon: '🍰' },
  { id: '4', name: 'Pizzas', icon: '🍕' },
  { id: '5', name: 'Japonês', icon: '🍱' },
  { id: '6', name: 'Açaí', icon: '🍨' },
];

export default function Home({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('Products', { category: item })}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});