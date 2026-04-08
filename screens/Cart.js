import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart({ navigation }) {
  const { cartItems, removeFromCart, total } = useCart();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Carrinho</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 48 }}>🛒</Text>
          <Text style={[styles.emptyText, { color: theme.colors.subtext }]}>
            Seu carrinho está vazio
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <View style={styles.info}>
                  <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                  <Text style={[styles.quantity, { color: theme.colors.subtext }]}>
                    Quantidade: {item.quantity}
                  </Text>
                </View>
                <View style={styles.rightSide}>
                  <Text style={styles.price}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.remove}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={[styles.totalContainer, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total:</Text>
            <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.buttonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 18 },
  card: {
    padding: 16, borderRadius: 12, marginBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', elevation: 2,
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  quantity: { fontSize: 14 },
  rightSide: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#FF6347', marginBottom: 8 },
  remove: { color: '#FF6347', fontSize: 14 },
  totalContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 20, borderRadius: 12, marginVertical: 16,
  },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#FF6347' },
  button: {
    backgroundColor: '#FF6347', padding: 16,
    borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});