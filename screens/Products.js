import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const products = {
  '1': [
    { id: '1', name: 'X-Burger', price: 25.90, description: 'Hambúrguer artesanal com queijo' },
    { id: '2', name: 'X-Bacon', price: 28.90, description: 'Hambúrguer com bacon crocante' },
    { id: '3', name: 'X-Salada', price: 24.90, description: 'Hambúrguer com salada fresca' },
  ],
  '2': [
    { id: '4', name: 'Coca-Cola', price: 6.00, description: 'Lata 350ml' },
    { id: '5', name: 'Guaraná', price: 5.50, description: 'Lata 350ml' },
    { id: '6', name: 'Suco Natural', price: 8.00, description: 'Laranja 500ml' },
  ],
  '3': [
    { id: '7', name: 'Brownie', price: 12.00, description: 'Chocolate belga' },
    { id: '8', name: 'Pudim', price: 10.00, description: 'Pudim de leite condensado' },
  ],
  '4': [
    { id: '9', name: 'Pizza Margherita', price: 45.00, description: 'Molho, mussarela e manjericão' },
    { id: '10', name: 'Pizza Pepperoni', price: 48.00, description: 'Molho, mussarela e pepperoni' },
  ],
  '5': [
    { id: '11', name: 'Combo 20 peças', price: 65.00, description: 'Seleção variada de sushis' },
    { id: '12', name: 'Hot Roll', price: 35.00, description: '8 peças empanadas' },
  ],
  '6': [
    { id: '13', name: 'Açaí 500ml', price: 15.00, description: 'Com granola e banana' },
    { id: '14', name: 'Açaí 700ml', price: 19.00, description: 'Com granola, banana e leite condensado' },
  ],
};

export default function Products({ route, navigation }) {
  const { category } = route.params;
  const categoryProducts = products[category.id] || [];
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{category.name}</Text>
      <FlatList
        data={categoryProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <View style={styles.info}>
              <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.description, { color: theme.colors.subtext }]}>{item.description}</Text>
            </View>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  info: { flex: 1 },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: { fontSize: 14 },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
  },
});