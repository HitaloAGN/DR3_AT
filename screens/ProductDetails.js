import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import AddToCartAnimation from '../components/AddToCartAnimation';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function ProductDetails({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowAnimation(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.name, { color: theme.colors.text }]}>{product.name}</Text>
      <Text style={[styles.description, { color: theme.colors.subtext }]}>{product.description}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

      <View style={styles.quantityContainer}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Quantidade:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: theme.colors.text }]}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.totalContainer, { borderColor: theme.colors.border }]}>
        <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total:</Text>
        <Text style={styles.totalPrice}>R$ {(product.price * quantity).toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <AddToCartAnimation
        visible={showAnimation}
        onHide={() => setShowAnimation(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  description: { fontSize: 16, marginBottom: 20 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#FF6347', marginBottom: 32 },
  quantityContainer: { marginBottom: 24 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    backgroundColor: '#FF6347',
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  quantityButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  quantityText: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 24 },
  totalContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 32, paddingVertical: 16,
    borderTopWidth: 1, borderBottomWidth: 1,
  },
  totalLabel: { fontSize: 20, fontWeight: '600' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#FF6347' },
  button: {
    backgroundColor: '#FF6347', padding: 16,
    borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});